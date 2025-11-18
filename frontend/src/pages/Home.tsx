import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { 
  BookOpen, 
  Calendar, 
  Award,
  Sparkles,
  TrendingUp,
  Users,
  Brain,
  Target,
  Clock,
  Check,
  Crown,
  ChevronRight,
  Play,
  FileText,
  Activity,
  CheckCircle
} from 'lucide-react'

export default function Home() {
  const user = useAuthStore((state) => state.user)

  // Симуляция данных пользователя
  const userProgress = {
    completedCourses: 3,
    activeCourses: 2,
    totalPoints: 1250,
    rank: 'Gold',
    weekStreak: 5
  }

  const upcomingClasses = [
    {
      id: 1,
      title: 'Python для начинающих',
      time: 'Сегодня, 15:00',
      duration: '1 час 30 мин',
      teacher: 'Иван Петров',
      type: 'live'
    },
    {
      id: 2,
      title: 'JavaScript Advanced',
      time: 'Завтра, 18:00',
      duration: '2 часа',
      teacher: 'Мария Сидорова',
      type: 'live'
    },
    {
      id: 3,
      title: 'React Hooks',
      time: 'Пятница, 16:00',
      duration: '1 час',
      teacher: 'Алексей Иванов',
      type: 'recorded'
    }
  ]

  const recentAssignments = [
    {
      id: 1,
      title: 'Лабораторная работа №3',
      course: 'Python для начинающих',
      deadline: 'Через 2 дня',
      status: 'pending',
      progress: 60
    },
    {
      id: 2,
      title: 'Проект: TODO приложение',
      course: 'JavaScript Advanced',
      deadline: 'Через 5 дней',
      status: 'in_progress',
      progress: 30
    },
    {
      id: 3,
      title: 'Тест по React',
      course: 'React Hooks',
      deadline: 'Через неделю',
      status: 'not_started',
      progress: 0
    }
  ]

  const aiSuggestions = [
    {
      icon: Brain,
      title: 'Рекомендуем продолжить',
      description: 'Вы остановились на уроке "Циклы в Python"',
      action: 'Продолжить обучение',
      link: '/courses/1'
    },
    {
      icon: Target,
      title: 'Скоро дедлайн!',
      description: 'Лабораторная работа №3 должна быть сдана через 2 дня',
      action: 'Выполнить задание',
      link: '/assignments/1'
    },
    {
      icon: Sparkles,
      title: 'Новый курс для вас',
      description: 'На основе вашего прогресса рекомендуем "TypeScript Основы"',
      action: 'Посмотреть курс',
      link: '/courses'
    }
  ]

  const quickActions = [
    { icon: Brain, label: 'AI Помощник', link: '/ai-chat', color: '#000000' },
    { icon: BookOpen, label: 'Мои курсы', link: '/my-courses', color: '#1a1a1a' },
    { icon: Calendar, label: 'Расписание', link: '/schedule', color: '#2d2d2d' },
    { icon: FileText, label: 'Задания', link: '/assignments', color: '#404040' }
  ]

  const achievements = [
    { icon: '🔥', label: 'Серия: 5 дней', description: 'Продолжайте!' },
    { icon: '🏆', label: 'Gold статус', description: '1250 баллов' },
    { icon: '📚', label: '3 курса', description: 'Завершено' },
    { icon: '⭐', label: 'Top 10%', description: 'В рейтинге' }
  ]

  const features = [
    {
      icon: Brain,
      title: 'AI Помощник с GPT-4',
      description: 'Персональный ассистент, который отвечает на вопросы 24/7, помогает с заданиями и объясняет сложные темы простым языком',
      benefits: [
        'Мгновенные ответы на вопросы',
        'Помощь с домашними заданиями',
        'Объяснение сложных концепций',
        'Доступен круглосуточно'
      ],
      number: '01'
    },
    {
      icon: Sparkles,
      title: 'Генератор материалов',
      description: 'Автоматическое создание конспектов, шпаргалок и резюме уроков. AI анализирует материал и выделяет ключевые моменты',
      benefits: [
        'Конспекты за секунды',
        'Адаптация под ваш стиль обучения',
        'Экспорт в PDF/Word',
        'Выделение важного'
      ],
      number: '02'
    },
    {
      icon: Calendar,
      title: 'Умное расписание',
      description: 'AI создает оптимальный график обучения на основе ваших целей, доступного времени и стиля обучения',
      benefits: [
        'Автоматическое планирование',
        'Учет дедлайнов',
        'Напоминания о занятиях',
        'Гибкая настройка'
      ],
      number: '03'
    },
    {
      icon: CheckCircle,
      title: 'Автопроверка заданий',
      description: 'Мгновенная проверка кода, тестов и письменных работ с детальной обратной связью и рекомендациями по улучшению',
      benefits: [
        'Моментальная проверка',
        'Детальный фидбек',
        'Указание на ошибки',
        'Советы по улучшению'
      ],
      number: '04'
    }
  ]

  const stats = [
    { icon: TrendingUp, label: 'Прогресс', value: '75%', change: '+12%' },
    { icon: BookOpen, label: 'Активных курсов', value: '2', change: 'из 5' },
    { icon: Award, label: 'Баллов', value: '1,250', change: '+85' },
    { icon: Activity, label: 'Серия дней', value: '5', change: 'дней' }
  ]

  return (
    <div>
      {/* Hero Section with Video Background */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 0 80px',
        marginBottom: '60px',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Video Background */}
        <div className="video-background">
          <video autoPlay loop muted playsInline>
            <source src="/videos/mixkit-person-typing-on-a-computer-in-detail-4907-full-hd.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            maxWidth: '800px',
            animation: 'fadeInUp 1s ease-out'
          }}>
            {/* Status Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 24px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '999px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              border: '2px solid #000000',
              animation: 'fadeInUp 1s ease-out 0.2s both'
            }}>
              <Crown size={16} />
              <span style={{ 
                fontSize: '12px', 
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase'
              }}>
                {userProgress.rank} Member
              </span>
              <span style={{ color: '#666666' }}>•</span>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>
                {userProgress.totalPoints} баллов
              </span>
            </div>

            <h1 style={{
              fontSize: '64px',
              fontWeight: 900,
              lineHeight: '1.1',
              marginBottom: '24px',
              color: 'white',
              textShadow: '0 8px 32px rgba(0,0,0,0.8)',
              letterSpacing: '-2px',
              fontFamily: "'Playfair Display', serif",
              animation: 'fadeInUp 1s ease-out 0.3s both'
            }}>
              С возвращением,<br/>
              <span style={{ fontStyle: 'italic' }}>{user?.full_name}!</span>
            </h1>

            <p style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.95)',
              marginBottom: '40px',
              lineHeight: '1.6',
              textShadow: '0 4px 16px rgba(0,0,0,0.6)',
              animation: 'fadeInUp 1s ease-out 0.4s both'
            }}>
              Ваш прогресс: <strong>{userProgress.completedCourses}</strong> курса завершено, <strong>{userProgress.activeCourses}</strong> в процессе. Серия активности: <strong>{userProgress.weekStreak} дней</strong> 🔥
            </p>

            {/* Quick Actions */}
            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              flexWrap: 'wrap',
              animation: 'fadeInUp 1s ease-out 0.5s both'
            }}>
              {quickActions.map((action, index) => (
                <Link 
                  key={index}
                  to={action.link}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 24px',
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '12px',
                    border: '2px solid #000000',
                    color: '#000000',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#000000'
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.95)'
                    e.currentTarget.style.color = '#000000'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)'
                  }}
                >
                  <action.icon size={18} />
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Stats Cards */}
        <div className="grid grid-4" style={{ marginBottom: '60px' }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card"
              style={{
                textAlign: 'center',
                animation: `scaleIn 0.6s ease-out ${index * 0.1}s both`,
                background: 'white',
                border: '2px solid #e0e0e0',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#000000'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '8px 8px 0 #000000'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{
                display: 'inline-flex',
                padding: '16px',
                background: '#000000',
                borderRadius: '12px',
                marginBottom: '20px'
              }}>
                <stat.icon size={24} color="white" />
              </div>
              <h3 style={{ 
                fontSize: '36px', 
                fontWeight: 900, 
                marginBottom: '8px',
                fontFamily: "'Playfair Display', serif",
                color: '#000000'
              }}>
                {stat.value}
              </h3>
              <p style={{ 
                color: '#666666', 
                fontWeight: 600,
                fontSize: '13px',
                marginBottom: '4px'
              }}>
                {stat.label}
              </p>
              <span style={{
                fontSize: '12px',
                color: '#2d2d2d',
                fontWeight: 700
              }}>
                {stat.change}
              </span>
            </div>
          ))}
        </div>

        {/* AI Recommendations */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '32px'
          }}>
            <div>
              <h2 style={{
                fontSize: '42px',
                fontWeight: 900,
                color: '#000000',
                letterSpacing: '-1px',
                fontFamily: "'Playfair Display', serif"
              }}>
                AI Рекомендации для вас
              </h2>
              <p style={{ fontSize: '16px', color: '#666666', marginTop: '8px' }}>
                Персонализированные советы на основе вашего прогресса
              </p>
            </div>
          </div>

          <div className="grid grid-3">
            {aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="card"
                style={{
                  animation: `fadeIn 0.8s ease-out ${index * 0.15}s both`,
                  background: index === 1 ? '#000000' : 'white',
                  color: index === 1 ? 'white' : '#000000',
                  border: `2px solid ${index === 1 ? '#000000' : '#e0e0e0'}`,
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                {index === 1 && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '24px',
                    padding: '6px 16px',
                    background: 'white',
                    color: '#000000',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    border: '2px solid #000000'
                  }}>
                    Срочно
                  </div>
                )}

                <div style={{
                  width: '56px',
                  height: '56px',
                  background: index === 1 ? 'white' : '#000000',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <suggestion.icon size={28} color={index === 1 ? '#000000' : 'white'} />
                </div>

                <h3 style={{ 
                  fontSize: '22px', 
                  fontWeight: 700, 
                  marginBottom: '12px',
                  fontFamily: "'Playfair Display', serif"
                }}>
                  {suggestion.title}
                </h3>
                <p style={{ 
                  color: index === 1 ? 'rgba(255,255,255,0.9)' : '#666666',
                  lineHeight: '1.6',
                  marginBottom: '24px',
                  fontSize: '15px'
                }}>
                  {suggestion.description}
                </p>

                <Link 
                  to={suggestion.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    background: index === 1 ? 'white' : '#000000',
                    color: index === 1 ? '#000000' : 'white',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    border: `2px solid ${index === 1 ? 'white' : '#000000'}`,
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  {suggestion.action}
                  <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Classes & Assignments */}
        <div className="grid grid-2" style={{ marginBottom: '60px', gap: '40px' }}>
          {/* Upcoming Classes */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 900,
                color: '#000000',
                letterSpacing: '-1px',
                fontFamily: "'Playfair Display', serif"
              }}>
                Предстоящие занятия
              </h2>
              <Link to="/schedule" style={{
                color: '#000000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Все занятия <ChevronRight size={16} />
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {upcomingClasses.map((classItem, index) => (
                <div
                  key={classItem.id}
                  className="card"
                  style={{
                    padding: '20px',
                    animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
                    border: '2px solid #e0e0e0',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#000000'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e0e0e0'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: classItem.type === 'live' ? '#000000' : '#f5f5f5',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `2px solid ${classItem.type === 'live' ? '#000000' : '#e0e0e0'}`,
                      flexShrink: 0
                    }}>
                      {classItem.type === 'live' ? (
                        <Play size={20} color="white" fill="white" />
                      ) : (
                        <Calendar size={20} color="#666666" />
                      )}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px'
                      }}>
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: 700,
                          color: '#000000'
                        }}>
                          {classItem.title}
                        </h3>
                        {classItem.type === 'live' && (
                          <span style={{
                            padding: '3px 10px',
                            background: '#000000',
                            color: 'white',
                            borderRadius: '999px',
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase'
                          }}>
                            Live
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={14} color="#666666" />
                          <span style={{ fontSize: '14px', color: '#666666' }}>
                            {classItem.time} • {classItem.duration}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Users size={14} color="#666666" />
                          <span style={{ fontSize: '14px', color: '#666666' }}>
                            {classItem.teacher}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Assignments */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 900,
                color: '#000000',
                letterSpacing: '-1px',
                fontFamily: "'Playfair Display', serif"
              }}>
                Текущие задания
              </h2>
              <Link to="/assignments" style={{
                color: '#000000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Все задания <ChevronRight size={16} />
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recentAssignments.map((assignment, index) => (
                <div
                  key={assignment.id}
                  className="card"
                  style={{
                    padding: '20px',
                    animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
                    border: '2px solid #e0e0e0',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#000000'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e0e0e0'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#000000',
                        marginBottom: '6px'
                      }}>
                        {assignment.title}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#666666', marginBottom: '4px' }}>
                        {assignment.course}
                      </p>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 12px',
                        background: assignment.progress > 50 ? '#f5f5f5' : '#000000',
                        color: assignment.progress > 50 ? '#000000' : 'white',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 600,
                        marginTop: '8px'
                      }}>
                        <Clock size={12} />
                        {assignment.deadline}
                      </div>
                    </div>

                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: '3px solid #e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '14px',
                      color: '#000000',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: '3px solid #000000',
                        clipPath: `polygon(0 0, 100% 0, 100% ${assignment.progress}%, 0 ${assignment.progress}%)`
                      }} />
                      {assignment.progress}%
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="progress-bar" style={{ height: '6px' }}>
                    <div className="progress-fill" style={{ width: `${assignment.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: 900,
            color: '#000000',
            letterSpacing: '-1px',
            fontFamily: "'Playfair Display', serif",
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            Ваши достижения
          </h2>

          <div className="grid grid-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="card"
                style={{
                  textAlign: 'center',
                  padding: '32px 24px',
                  animation: `scaleIn 0.6s ease-out ${index * 0.1}s both`,
                  border: '2px solid #e0e0e0',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000000'
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e0e0e0'
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                }}
              >
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px',
                  animation: index === 0 ? 'pulse 2s ease-in-out infinite' : 'none'
                }}>
                  {achievement.icon}
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: '#000000',
                  fontFamily: "'Playfair Display', serif"
                }}>
                  {achievement.label}
                </h3>
                <p style={{ fontSize: '14px', color: '#666666' }}>
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Features */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 900,
              marginBottom: '16px',
              color: '#000000',
              letterSpacing: '-2px',
              fontFamily: "'Playfair Display', serif"
            }}>
              Возможности платформы
            </h2>
            <div className="decorative-line" />
            <p style={{ fontSize: '18px', color: '#666666', maxWidth: '700px', margin: '16px auto 0' }}>
              Узнайте, как AI помогает вам учиться эффективнее и достигать целей быстрее
            </p>
          </div>

          <div className="grid grid-2" style={{ gap: '32px' }}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="card"
                style={{
                  animation: `fadeIn 1s ease-out ${index * 0.2}s both`,
                  position: 'relative',
                  background: 'white',
                  border: '2px solid #e0e0e0',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  padding: '36px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000000'
                  e.currentTarget.style.boxShadow = '12px 12px 0 #000000'
                  e.currentTarget.style.transform = 'translate(-4px, -4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e0e0e0'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
                  e.currentTarget.style.transform = 'translate(0, 0)'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  fontSize: '80px',
                  fontWeight: 900,
                  color: '#f5f5f5',
                  fontFamily: "'Playfair Display', serif",
                  lineHeight: '1'
                }}>
                  {feature.number}
                </div>
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: '#000000',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    boxShadow: '4px 4px 0 #e0e0e0'
                  }}>
                    <feature.icon size={32} color="white" />
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '28px', 
                    fontWeight: 700, 
                    marginBottom: '16px',
                    color: '#000000',
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{ 
                    color: '#666666', 
                    lineHeight: '1.7',
                    fontSize: '16px',
                    marginBottom: '24px'
                  }}>
                    {feature.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    {feature.benefits.map((benefit, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: '#000000',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Check size={12} color="white" strokeWidth={3} />
                        </div>
                        <span style={{
                          fontSize: '14px',
                          color: '#333333',
                          fontWeight: 500
                        }}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="card" style={{
          background: '#000000',
          color: 'white',
          textAlign: 'center',
          padding: '70px 48px',
          marginBottom: '80px',
          border: 'none',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Sparkles size={56} style={{ marginBottom: '28px' }} />
            <h2 style={{ 
              fontSize: '46px', 
              fontWeight: 900, 
              marginBottom: '20px',
              letterSpacing: '-2px',
              fontFamily: "'Playfair Display', serif"
            }}>
              Готовы начать новый курс?
            </h2>
            <div className="decorative-line" style={{
              background: 'linear-gradient(90deg, transparent, white, transparent)'
            }} />
            <p style={{ 
              fontSize: '18px', 
              marginBottom: '40px', 
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto 40px',
              lineHeight: '1.7'
            }}>
              Изучайте новые технологии с персональным AI помощником и достигайте своих целей быстрее
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              justifyContent: 'center', 
              flexWrap: 'wrap'
            }}>
              <Link to="/courses" className="btn" style={{ 
                background: 'white', 
                color: '#000000',
                fontSize: '15px',
                padding: '18px 36px',
                borderRadius: '12px',
                border: '2px solid white'
              }}>
                <BookOpen size={20} />
                Все курсы
              </Link>
              <Link to="/ai-chat" className="btn" style={{ 
                background: 'transparent', 
                color: 'white',
                fontSize: '15px',
                padding: '18px 36px',
                borderRadius: '12px',
                border: '2px solid white'
              }}>
                <Brain size={20} />
                AI Помощник
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
