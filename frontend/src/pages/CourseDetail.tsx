import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { courseService, enrollmentService, lessonService, aiService } from '../api/services'
import { BookOpen, Clock, TrendingUp, Play, FileText, Sparkles, CheckCircle } from 'lucide-react'

interface Course {
  id: number
  title: string
  description: string
  category: string
  level: string
  instructor_id: number
  lessons: Lesson[]
}

interface Lesson {
  id: number
  title: string
  content: string
  video_url?: string
  duration_minutes?: number
  order: number
}

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolled, setEnrolled] = useState(false)
  const [enrolling, setEnrolling] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    fetchCourse()
  }, [id])

  const fetchCourse = async () => {
    try {
      const response = await courseService.getCourse(Number(id))
      setCourse(response.data)
      
      const lessonsResponse = await courseService.getLessons(Number(id))
      setCourse(prev => prev ? { ...prev, lessons: lessonsResponse.data } : null)
    } catch (error) {
      console.error('Error fetching course:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async () => {
    setEnrolling(true)
    try {
      await enrollmentService.enroll(Number(id))
      setEnrolled(true)
      alert('Вы успешно записались на курс!')
    } catch (error) {
      console.error('Error enrolling:', error)
      alert('Ошибка при записи на курс')
    } finally {
      setEnrolling(false)
    }
  }

  const handleGenerateSummary = async () => {
    if (!course) return
    setGenerating(true)
    try {
      await aiService.generateSummary({
        course_id: course.id,
        title: `Конспект: ${course.title}`,
        material_type: 'summary'
      })
      alert('Конспект успешно сгенерирован! Проверьте раздел материалов.')
    } catch (error) {
      console.error('Error generating summary:', error)
      alert('Ошибка при генерации конспекта')
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔄</div>
        <p style={{ color: 'white', fontSize: '18px' }}>Загрузка курса...</p>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>😕</div>
        <h2 style={{ color: 'white', marginBottom: '16px' }}>Курс не найден</h2>
        <button onClick={() => navigate('/courses')} className="btn btn-primary">
          Вернуться к курсам
        </button>
      </div>
    )
  }

  return (
    <div className="container">
      {/* Course Header */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <span className="badge badge-primary">{course.category}</span>
              <span className="badge badge-success">
                <TrendingUp size={14} style={{ marginRight: '4px' }} />
                {course.level}
              </span>
            </div>

            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>
              {course.title}
            </h1>

            <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
              {course.description}
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={enrolled ? undefined : handleEnroll}
                disabled={enrolling || enrolled}
                className="btn btn-primary"
              >
                {enrolled ? (
                  <>
                    <CheckCircle size={20} />
                    Вы записаны
                  </>
                ) : (
                  <>
                    <BookOpen size={20} />
                    {enrolling ? 'Запись...' : 'Записаться на курс'}
                  </>
                )}
              </button>

              <button
                onClick={handleGenerateSummary}
                disabled={generating}
                className="btn btn-secondary"
              >
                <Sparkles size={20} />
                {generating ? 'Генерация...' : 'Сгенерировать конспект'}
              </button>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            padding: '32px',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div>
              <div style={{ opacity: 0.9, marginBottom: '4px' }}>Уроков</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                {course.lessons?.length || 0}
              </div>
            </div>
            <div>
              <div style={{ opacity: 0.9, marginBottom: '4px' }}>Общая длительность</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                {course.lessons?.reduce((acc, l) => acc + (l.duration_minutes || 0), 0) || 0} мин
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedLesson ? '1fr 1fr' : '1fr',
        gap: '32px'
      }}>
        <div>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            marginBottom: '24px',
            color: 'white'
          }}>
            Содержание курса
          </h2>

          {course.lessons && course.lessons.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="card"
                  onClick={() => setSelectedLesson(lesson)}
                  style={{
                    cursor: 'pointer',
                    border: selectedLesson?.id === lesson.id ? '2px solid #667eea' : '2px solid transparent',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '18px'
                    }}>
                      {index + 1}
                    </div>

                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                        {lesson.title}
                      </h3>
                      <div style={{ 
                        display: 'flex', 
                        gap: '16px', 
                        color: '#6b7280',
                        fontSize: '14px'
                      }}>
                        {lesson.duration_minutes && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={14} />
                            {lesson.duration_minutes} мин
                          </span>
                        )}
                        {lesson.video_url && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Play size={14} />
                            Видео
                          </span>
                        )}
                      </div>
                    </div>

                    <Play size={24} color="#667eea" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
              <FileText size={48} color="#9ca3af" style={{ margin: '0 auto 16px' }} />
              <p style={{ color: '#6b7280' }}>Уроки пока не добавлены</p>
            </div>
          )}
        </div>

        {/* Lesson Content */}
        {selectedLesson && (
          <div className="card" style={{ position: 'sticky', top: '20px', maxHeight: '80vh', overflow: 'auto' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
              {selectedLesson.title}
            </h2>

            {selectedLesson.video_url && (
              <div style={{
                background: '#f3f4f6',
                borderRadius: '8px',
                padding: '32px',
                textAlign: 'center',
                marginBottom: '24px'
              }}>
                <Play size={48} color="#667eea" style={{ margin: '0 auto' }} />
                <p style={{ marginTop: '12px', color: '#6b7280' }}>
                  Видео: {selectedLesson.video_url}
                </p>
              </div>
            )}

            <div style={{
              lineHeight: '1.8',
              color: '#374151',
              whiteSpace: 'pre-wrap'
            }}>
              {selectedLesson.content}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


