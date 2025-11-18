import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { 
  BookOpen, 
  GraduationCap, 
  MessageSquare, 
  LayoutDashboard, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

export default function Layout() {
  const { user, logout, isTeacher } = useAuthStore()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/', label: 'Главная', icon: LayoutDashboard },
    { path: '/courses', label: 'Все курсы', icon: BookOpen },
    { path: '/my-courses', label: 'Мои курсы', icon: GraduationCap },
    { path: '/ai-chat', label: 'AI Помощник', icon: MessageSquare },
    { path: '/dashboard', label: 'Панель управления', icon: LayoutDashboard },
  ]

  if (isTeacher()) {
    navItems.push({ 
      path: '/teacher', 
      label: 'Преподаватель', 
      icon: GraduationCap 
    })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px'
        }}>
          <Link to="/" style={{
            fontSize: '24px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none'
          }}>
            🎓 EduAI
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '24px' }} className="desktop-nav">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#374151',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 16px',
                background: '#f3f4f6',
                borderRadius: '999px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  {user?.full_name?.[0]?.toUpperCase()}
                </div>
                <span style={{ fontWeight: 500 }}>{user?.full_name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ padding: '8px 16px' }}
              >
                <LogOut size={18} />
                Выход
              </button>

              {/* Mobile Menu Button */}
              <button
                className="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  display: 'none',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px'
                }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="mobile-nav" style={{
            background: 'white',
            borderTop: '1px solid #e5e7eb',
            padding: '16px'
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
                  padding: '12px',
                  color: '#374151',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  marginBottom: '8px'
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
      <main style={{ flex: 1, padding: '32px 0' }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        background: 'white',
        borderTop: '1px solid #e5e7eb',
        padding: '24px 0',
        marginTop: 'auto'
      }}>
        <div className="container text-center">
          <p style={{ color: '#6b7280' }}>
            © 2024 EduAI. Платформа онлайн-образования с AI помощником.
          </p>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}


