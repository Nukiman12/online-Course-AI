import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { enrollmentService } from '../api/services'
import { BookOpen, TrendingUp, Calendar, CheckCircle } from 'lucide-react'

interface Enrollment {
  id: number
  enrolled_at: string
  progress: number
  completed: boolean
  course: {
    id: number
    title: string
    description: string
    category: string
    level: string
  }
}

export default function MyCourses() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEnrollments()
  }, [])

  const fetchEnrollments = async () => {
    try {
      const response = await enrollmentService.getMyEnrollments()
      setEnrollments(response.data)
    } catch (error) {
      console.error('Error fetching enrollments:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔄</div>
        <p style={{ color: 'white', fontSize: '18px' }}>Загрузка курсов...</p>
      </div>
    )
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '40px',
          fontWeight: 'bold',
          marginBottom: '16px',
          color: 'white'
        }}>
          Мои курсы
        </h1>
        <p style={{ fontSize: '18px', color: 'white', opacity: 0.9 }}>
          Продолжайте обучение и отслеживайте свой прогресс
        </p>
      </div>

      {enrollments.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '80px 24px' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>📚</div>
          <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>
            Вы еще не записаны ни на один курс
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '32px', fontSize: '18px' }}>
            Начните обучение прямо сейчас!
          </p>
          <Link to="/courses" className="btn btn-primary" style={{ fontSize: '18px' }}>
            <BookOpen size={20} />
            Просмотреть доступные курсы
          </Link>
        </div>
      ) : (
        <>
          {/* Statistics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  padding: '12px',
                  background: '#667eea15',
                  borderRadius: '12px'
                }}>
                  <BookOpen size={24} color="#667eea" />
                </div>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                    {enrollments.length}
                  </div>
                  <div style={{ color: '#6b7280' }}>Всего курсов</div>
                </div>
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  padding: '12px',
                  background: '#10b98115',
                  borderRadius: '12px'
                }}>
                  <CheckCircle size={24} color="#10b981" />
                </div>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                    {enrollments.filter(e => e.completed).length}
                  </div>
                  <div style={{ color: '#6b7280' }}>Завершено</div>
                </div>
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  padding: '12px',
                  background: '#f59e0b15',
                  borderRadius: '12px'
                }}>
                  <TrendingUp size={24} color="#f59e0b" />
                </div>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                    {Math.round(
                      enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length
                    )}%
                  </div>
                  <div style={{ color: '#6b7280' }}>Средний прогресс</div>
                </div>
              </div>
            </div>
          </div>

          {/* Course List */}
          <div className="grid grid-2">
            {enrollments.map((enrollment, index) => (
              <Link
                key={enrollment.id}
                to={`/courses/${enrollment.course.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="card"
                  style={{
                    height: '100%',
                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '12px'
                    }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span className="badge badge-primary">
                          {enrollment.course.category}
                        </span>
                        <span className="badge badge-success">
                          {enrollment.course.level}
                        </span>
                      </div>
                      {enrollment.completed && (
                        <span className="badge" style={{
                          background: '#d1fae5',
                          color: '#065f46'
                        }}>
                          <CheckCircle size={14} style={{ marginRight: '4px' }} />
                          Завершено
                        </span>
                      )}
                    </div>

                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      marginBottom: '12px',
                      color: '#111827'
                    }}>
                      {enrollment.course.title}
                    </h3>

                    <p style={{
                      color: '#6b7280',
                      marginBottom: '16px',
                      lineHeight: '1.5',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {enrollment.course.description}
                    </p>
                  </div>

                  {/* Progress */}
                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                      fontSize: '14px'
                    }}>
                      <span style={{ color: '#6b7280' }}>Прогресс</span>
                      <span style={{ fontWeight: 'bold', color: '#667eea' }}>
                        {Math.round(enrollment.progress)}%
                      </span>
                    </div>
                    <div style={{
                      height: '8px',
                      background: '#e5e7eb',
                      borderRadius: '999px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${enrollment.progress}%`,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>

                  <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    background: '#f3f4f6',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    <Calendar size={16} />
                    Записан: {new Date(enrollment.enrolled_at).toLocaleDateString('ru-RU')}
                  </div>

                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '16px' }}
                  >
                    {enrollment.completed ? 'Повторить курс' : 'Продолжить обучение'}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}


