import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { 
  BookOpen, 
  MessageSquare, 
  Calendar, 
  Award,
  Sparkles,
  TrendingUp,
  Users,
  Brain
} from 'lucide-react'

export default function Home() {
  const user = useAuthStore((state) => state.user)

  const features = [
    {
      icon: Brain,
      title: 'AI Помощник',
      description: 'Интеллектуальный помощник отвечает на вопросы и помогает в обучении',
      color: '#667eea'
    },
    {
      icon: Sparkles,
      title: 'Генерация материалов',
      description: 'Автоматическое создание конспектов и практических заданий',
      color: '#764ba2'
    },
    {
      icon: MessageSquare,
      title: 'Подсказки',
      description: 'Получайте умные подсказки, не раскрывающие прямых ответов',
      color: '#f59e0b'
    },
    {
      icon: Calendar,
      title: 'Умное расписание',
      description: 'AI создаст оптимальное расписание обучения для вас',
      color: '#10b981'
    }
  ]

  const stats = [
    { icon: BookOpen, label: 'Курсов', value: '50+', color: '#667eea' },
    { icon: Users, label: 'Студентов', value: '1000+', color: '#764ba2' },
    { icon: Award, label: 'Сертификатов', value: '500+', color: '#f59e0b' },
    { icon: TrendingUp, label: 'Успеваемость', value: '95%', color: '#10b981' }
  ]

  return (
    <div className="container">
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '80px 20px',
        animation: 'fadeIn 0.8s ease-out'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.2'
        }}>
          Привет, {user?.full_name}! 👋
        </h1>
        <p style={{
          fontSize: '20px',
          color: 'white',
          marginBottom: '32px',
          maxWidth: '600px',
          margin: '0 auto 32px'
        }}>
          Добро пожаловать в EduAI - платформу онлайн-образования с искусственным интеллектом
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/courses" className="btn btn-primary" style={{ fontSize: '18px' }}>
            <BookOpen size={20} />
            Начать обучение
          </Link>
          <Link to="/ai-chat" className="btn" style={{ 
            background: 'white', 
            color: '#667eea',
            fontSize: '18px'
          }}>
            <MessageSquare size={20} />
            Спросить AI
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-2" style={{ marginBottom: '64px' }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card"
            style={{
              textAlign: 'center',
              animation: `fadeIn 0.8s ease-out ${index * 0.1}s both`
            }}
          >
            <div style={{
              display: 'inline-flex',
              padding: '16px',
              background: `${stat.color}15`,
              borderRadius: '50%',
              marginBottom: '16px'
            }}>
              <stat.icon size={32} color={stat.color} />
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
              {stat.value}
            </h3>
            <p style={{ color: '#6b7280' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ marginBottom: '64px' }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '48px',
          color: 'white'
        }}>
          Возможности платформы
        </h2>
        <div className="grid grid-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card"
              style={{
                animation: `fadeIn 0.8s ease-out ${index * 0.1 + 0.2}s both`
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div style={{
                  padding: '12px',
                  background: `${feature.color}15`,
                  borderRadius: '12px'
                }}>
                  <feature.icon size={28} color={feature.color} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  {feature.title}
                </h3>
              </div>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center',
        padding: '48px 24px'
      }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
          Готовы начать обучение?
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9 }}>
          Изучайте новые навыки с помощью AI-технологий
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/courses" className="btn" style={{ 
            background: 'white', 
            color: '#667eea',
            fontSize: '18px'
          }}>
            Просмотреть курсы
          </Link>
          <Link to="/my-courses" className="btn" style={{ 
            background: 'rgba(255,255,255,0.2)', 
            color: 'white',
            fontSize: '18px'
          }}>
            Мои курсы
          </Link>
        </div>
      </div>
    </div>
  )
}


