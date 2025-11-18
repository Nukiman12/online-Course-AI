import { useState, useEffect } from 'react'
import { scheduleService, assignmentService } from '../api/services'
import { useAuthStore } from '../store/authStore'
import { Calendar, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface Schedule {
  id: number
  title: string
  description: string
  scheduled_time: string
  duration_minutes: number
  completed: boolean
}

interface Assignment {
  id: number
  title: string
  description: string
  status: string
  grade: number | null
  due_date: string | null
  submitted_at: string | null
}

export default function Dashboard() {
  const user = useAuthStore((state) => state.user)
  const [schedule, setSchedule] = useState<Schedule[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [scheduleRes, assignmentsRes] = await Promise.all([
        scheduleService.getMySchedule(),
        assignmentService.getMyAssignments()
      ])
      setSchedule(scheduleRes.data)
      setAssignments(assignmentsRes.data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const upcomingSchedule = schedule
    .filter(s => !s.completed && new Date(s.scheduled_time) > new Date())
    .sort((a, b) => new Date(a.scheduled_time).getTime() - new Date(b.scheduled_time).getTime())
    .slice(0, 5)

  const pendingAssignments = assignments.filter(a => a.status === 'pending')
  const gradedAssignments = assignments.filter(a => a.status === 'graded')

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔄</div>
        <p style={{ color: 'white', fontSize: '18px' }}>Загрузка...</p>
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
          Панель управления
        </h1>
        <p style={{ fontSize: '18px', color: 'white', opacity: 0.9 }}>
          Добро пожаловать, {user?.full_name}!
        </p>
      </div>

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
              <Calendar size={24} color="#667eea" />
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                {upcomingSchedule.length}
              </div>
              <div style={{ color: '#6b7280' }}>Предстоящих занятий</div>
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
              <FileText size={24} color="#f59e0b" />
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                {pendingAssignments.length}
              </div>
              <div style={{ color: '#6b7280' }}>Заданий к выполнению</div>
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
                {gradedAssignments.length}
              </div>
              <div style={{ color: '#6b7280' }}>Проверенных работ</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '32px'
      }}>
        {/* Upcoming Schedule */}
        <div className="card">
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Calendar size={24} color="#667eea" />
            Предстоящие занятия
          </h2>

          {upcomingSchedule.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 16px', color: '#6b7280' }}>
              <Calendar size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
              <p>Нет запланированных занятий</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {upcomingSchedule.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: '16px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    borderLeft: '4px solid #667eea'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <h3 style={{ fontWeight: 'bold', flex: 1 }}>{item.title}</h3>
                    <span style={{
                      fontSize: '14px',
                      color: '#667eea',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Clock size={14} />
                      {item.duration_minutes} мин
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                    {item.description}
                  </p>
                  <div style={{ fontSize: '14px', color: '#667eea', fontWeight: 500 }}>
                    {new Date(item.scheduled_time).toLocaleString('ru-RU')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Assignments */}
        <div className="card">
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <FileText size={24} color="#f59e0b" />
            Задания
          </h2>

          {assignments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 16px', color: '#6b7280' }}>
              <FileText size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
              <p>Нет заданий</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {assignments.slice(0, 5).map((assignment) => (
                <div
                  key={assignment.id}
                  style={{
                    padding: '16px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${
                      assignment.status === 'graded' ? '#10b981' :
                      assignment.status === 'submitted' ? '#f59e0b' : '#ef4444'
                    }`
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <h3 style={{ fontWeight: 'bold', flex: 1 }}>{assignment.title}</h3>
                    <span className={`badge badge-${
                      assignment.status === 'graded' ? 'success' :
                      assignment.status === 'submitted' ? 'warning' : 'danger'
                    }`}>
                      {assignment.status === 'graded' && <CheckCircle size={14} style={{ marginRight: '4px' }} />}
                      {assignment.status === 'pending' && <AlertCircle size={14} style={{ marginRight: '4px' }} />}
                      {assignment.status === 'graded' ? 'Проверено' :
                       assignment.status === 'submitted' ? 'Отправлено' : 'Ожидает'}
                    </span>
                  </div>

                  {assignment.grade !== null && (
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: assignment.grade >= 70 ? '#10b981' : '#ef4444',
                      marginBottom: '8px'
                    }}>
                      Оценка: {assignment.grade}/100
                    </div>
                  )}

                  {assignment.due_date && (
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>
                      Срок: {new Date(assignment.due_date).toLocaleDateString('ru-RU')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


