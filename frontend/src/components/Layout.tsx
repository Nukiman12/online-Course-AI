import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { 
  BookOpen, 
  GraduationCap, 
  LogOut,
  Menu,
  X,
  Sparkles,
  Home,
  LayoutDashboard,
  ChevronRight,
  Brain,
  Calendar
} from 'lucide-react'
import { useState } from 'react'

export default function Layout() {
  const { user, logout, isTeacher } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/', label: 'Главная', icon: Home },
    { path: '/courses', label: 'Курсы', icon: BookOpen },
    { path: '/my-courses', label: 'Мои курсы', icon: GraduationCap },
    { path: '/ai-chat', label: 'AI', icon: Sparkles },
    { path: '/dashboard', label: 'Панель', icon: LayoutDashboard },
  ]

  if (isTeacher()) {
    navItems.push({ 
      path: '/teacher', 
      label: 'Преподаватель', 
      icon: GraduationCap 
    })
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Aristocratic Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'white',
        borderBottom: '3px solid #000000',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          maxWidth: '1400px'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #000000',
              boxShadow: '4px 4px 0 #e0e0e0',
              fontSize: '20px'
            }}>
              🎓
            </div>
            <span style={{
              fontSize: '26px',
              fontWeight: 900,
              color: '#000000',
              letterSpacing: '-1px',
              fontFamily: "'Playfair Display', serif"
            }}>
              EduAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ 
            display: 'flex', 
            gap: '8px', 
            alignItems: 'center'
          }} className="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  background: isActive(item.path) ? '#000000' : 'transparent',
                  color: isActive(item.path) ? 'white' : '#000000',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  transition: 'all 0.3s',
                  border: isActive(item.path) ? '2px solid #000000' : '2px solid transparent',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.background = '#f5f5f5'
                    e.currentTarget.style.borderColor = '#e0e0e0'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'transparent'
                  }
                }}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Menu & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* User Avatar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 18px',
              borderRadius: '10px',
              border: '2px solid #e0e0e0',
              background: 'white'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: '16px',
                border: '2px solid #000000'
              }}>
                {user?.full_name?.[0]?.toUpperCase()}
              </div>
              <span style={{ 
                fontWeight: 600, 
                color: '#000000',
                fontSize: '15px'
              }} className="user-name">
                {user?.full_name}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                padding: '10px',
                border: '2px solid #000000',
                borderRadius: '10px',
                cursor: 'pointer',
                color: '#000000',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#000000'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white'
                e.currentTarget.style.color = '#000000'
              }}
            >
              <LogOut size={18} />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                background: 'white',
                border: '2px solid #000000',
                borderRadius: '10px',
                cursor: 'pointer',
                padding: '10px',
                color: '#000000'
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="mobile-nav" style={{
            borderTop: '2px solid #e0e0e0',
            padding: '16px',
            animation: 'slideIn 0.3s ease-out',
            background: 'white'
          }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  color: isActive(item.path) ? 'white' : '#000000',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  marginBottom: '8px',
                  background: isActive(item.path) ? '#000000' : '#f5f5f5',
                  fontWeight: 600,
                  transition: 'all 0.3s',
                  border: '2px solid ' + (isActive(item.path) ? '#000000' : '#e0e0e0')
                }}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, paddingTop: '40px', paddingBottom: '80px' }}>
        <Outlet />
      </main>

      {/* Aristocratic Footer */}
      <footer style={{
        borderTop: '3px solid #000000',
        padding: '48px 0 32px',
        marginTop: 'auto',
        background: 'white'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '40px'
          }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  border: '2px solid #000000',
                  boxShadow: '4px 4px 0 #e0e0e0'
                }}>
                  🎓
                </div>
                <span style={{
                  fontSize: '22px',
                  fontWeight: 900,
                  color: '#000000',
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: '-1px'
                }}>
                  EduAI
                </span>
              </div>
              <p style={{ color: '#666666', fontSize: '14px', lineHeight: '1.7', marginBottom: '16px' }}>
                Платформа онлайн-образования нового поколения с искусственным интеллектом
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                {['GitHub', 'Twitter', 'LinkedIn'].map((social, i) => (
                  <div key={i} style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontSize: '18px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#000000'
                    e.currentTarget.style.background = '#000000'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e0e0e0'
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                  >
                    {i === 0 ? '💻' : i === 1 ? '🐦' : '💼'}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 style={{ 
                color: '#000000', 
                fontWeight: 700, 
                marginBottom: '20px',
                fontSize: '14px',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                Быстрые ссылки
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Все курсы', to: '/courses' },
                  { label: 'Мои курсы', to: '/my-courses' },
                  { label: 'Расписание', to: '/schedule' },
                  { label: 'Задания', to: '/assignments' }
                ].map((link, i) => (
                  <Link key={i} to={link.to} style={{ 
                    color: '#666666', 
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontWeight: 500,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#000000'
                    e.currentTarget.style.paddingLeft = '8px'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#666666'
                    e.currentTarget.style.paddingLeft = '0'
                  }}
                  >
                    <ChevronRight size={14} />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* AI Features */}
            <div>
              <h3 style={{ 
                color: '#000000', 
                fontWeight: 700, 
                marginBottom: '20px',
                fontSize: '14px',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                AI Возможности
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { icon: Brain, label: 'AI Помощник', desc: 'GPT-4 Integration' },
                  { icon: Sparkles, label: 'Генератор материалов', desc: 'Конспекты за секунды' },
                  { icon: Calendar, label: 'Умное расписание', desc: 'Автоматическое планирование' }
                ].map((feature, i) => (
                  <div key={i} style={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    color: '#666666', 
                    fontSize: '13px',
                    fontWeight: 500
                  }}>
                    <feature.icon size={16} color="#000000" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <div style={{ color: '#000000', fontWeight: 600, marginBottom: '2px' }}>
                        {feature.label}
                      </div>
                      <div style={{ fontSize: '12px', color: '#999999' }}>
                        {feature.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 style={{ 
                color: '#000000', 
                fontWeight: 700, 
                marginBottom: '20px',
                fontSize: '14px',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                Поддержка
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Центр помощи', desc: 'FAQ и гайды' },
                  { label: 'Связаться с нами', desc: 'support@eduai.com' },
                  { label: 'Сообщество', desc: 'Форум студентов' },
                  { label: 'Обновления', desc: 'Новости платформы' }
                ].map((item, i) => (
                  <div key={i} style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.paddingLeft = '8px'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.paddingLeft = '0'
                  }}
                  >
                    <div style={{ 
                      color: '#000000',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '2px'
                    }}>
                      {item.label}
                    </div>
                    <div style={{ 
                      color: '#999999',
                      fontSize: '12px'
                    }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{
            paddingTop: '32px',
            borderTop: '2px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <p style={{ 
              color: '#666666', 
              fontSize: '14px',
              fontWeight: 500
            }}>
              © 2024 EduAI. Создано с ❤️ для образования будущего
            </p>
            <div style={{ 
              display: 'flex',
              gap: '24px',
              color: '#666666',
              fontSize: '14px',
              fontWeight: 500
            }}>
              <span style={{ 
                cursor: 'pointer',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#000000'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}
              >
                Политика
              </span>
              <span>•</span>
              <span style={{ 
                cursor: 'pointer',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#000000'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}
              >
                Условия
              </span>
              <span>•</span>
              <span style={{ 
                cursor: 'pointer',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#000000'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}
              >
                Контакты
              </span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 968px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .user-name {
            display: none !important;
          }
        }
        @media (min-width: 969px) {
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
