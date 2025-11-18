import { useState, useEffect } from 'react'
import { courseService, lessonService } from '../api/services'
import { useAuthStore } from '../store/authStore'
import { Plus, Edit, Trash2, BookOpen, Users, Award } from 'lucide-react'

interface Course {
  id: number
  title: string
  description: string
  category: string
  level: string
  instructor_id: number
}

interface Lesson {
  id: number
  course_id: number
  title: string
  content: string
  video_url?: string
  order: number
  duration_minutes?: number
}

export default function TeacherDashboard() {
  const user = useAuthStore((state) => state.user)
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [showCourseModal, setShowCourseModal] = useState(false)
  const [showLessonModal, setShowLessonModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)

  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner'
  })

  const [lessonForm, setLessonForm] = useState({
    title: '',
    content: '',
    video_url: '',
    order: 1,
    duration_minutes: 60
  })

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    if (selectedCourse) {
      fetchLessons(selectedCourse.id)
    }
  }, [selectedCourse])

  const fetchCourses = async () => {
    try {
      const response = await courseService.getCourses()
      const myCourses = response.data.filter((c: Course) => c.instructor_id === user?.id)
      setCourses(myCourses)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchLessons = async (courseId: number) => {
    try {
      const response = await courseService.getLessons(courseId)
      setLessons(response.data)
    } catch (error) {
      console.error('Error fetching lessons:', error)
    }
  }

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingCourse) {
        await courseService.updateCourse(editingCourse.id, courseForm)
      } else {
        await courseService.createCourse(courseForm)
      }
      fetchCourses()
      setShowCourseModal(false)
      resetCourseForm()
    } catch (error) {
      console.error('Error saving course:', error)
      alert('Ошибка при сохранении курса')
    }
  }

  const handleDeleteCourse = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот курс?')) return
    
    try {
      await courseService.deleteCourse(id)
      fetchCourses()
      if (selectedCourse?.id === id) {
        setSelectedCourse(null)
      }
    } catch (error) {
      console.error('Error deleting course:', error)
      alert('Ошибка при удалении курса')
    }
  }

  const handleSaveLesson = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCourse) return

    try {
      const lessonData = {
        ...lessonForm,
        course_id: selectedCourse.id
      }

      if (editingLesson) {
        await lessonService.updateLesson(editingLesson.id, lessonData)
      } else {
        await lessonService.createLesson(lessonData)
      }
      
      fetchLessons(selectedCourse.id)
      setShowLessonModal(false)
      resetLessonForm()
    } catch (error) {
      console.error('Error saving lesson:', error)
      alert('Ошибка при сохранении урока')
    }
  }

  const handleDeleteLesson = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот урок?')) return
    
    try {
      await lessonService.deleteLesson(id)
      if (selectedCourse) {
        fetchLessons(selectedCourse.id)
      }
    } catch (error) {
      console.error('Error deleting lesson:', error)
      alert('Ошибка при удалении урока')
    }
  }

  const openCourseModal = (course?: Course) => {
    if (course) {
      setEditingCourse(course)
      setCourseForm({
        title: course.title,
        description: course.description,
        category: course.category,
        level: course.level
      })
    }
    setShowCourseModal(true)
  }

  const openLessonModal = (lesson?: Lesson) => {
    if (lesson) {
      setEditingLesson(lesson)
      setLessonForm({
        title: lesson.title,
        content: lesson.content,
        video_url: lesson.video_url || '',
        order: lesson.order,
        duration_minutes: lesson.duration_minutes || 60
      })
    }
    setShowLessonModal(true)
  }

  const resetCourseForm = () => {
    setCourseForm({ title: '', description: '', category: '', level: 'beginner' })
    setEditingCourse(null)
  }

  const resetLessonForm = () => {
    setLessonForm({ title: '', content: '', video_url: '', order: 1, duration_minutes: 60 })
    setEditingLesson(null)
  }

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
          Панель преподавателя
        </h1>
        <p style={{ fontSize: '18px', color: 'white', opacity: 0.9 }}>
          Управляйте своими курсами и уроками
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
              <BookOpen size={24} color="#667eea" />
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                {courses.length}
              </div>
              <div style={{ color: '#6b7280' }}>Моих курсов</div>
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
              <Users size={24} color="#10b981" />
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                {lessons.length}
              </div>
              <div style={{ color: '#6b7280' }}>Всего уроков</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedCourse ? '1fr 2fr' : '1fr',
        gap: '32px'
      }}>
        {/* Courses List */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
              Мои курсы
            </h2>
            <button
              onClick={() => openCourseModal()}
              className="btn btn-primary"
            >
              <Plus size={20} />
              Создать
            </button>
          </div>

          {courses.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
              <BookOpen size={48} color="#9ca3af" style={{ margin: '0 auto 16px' }} />
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                У вас пока нет курсов
              </p>
              <button
                onClick={() => openCourseModal()}
                className="btn btn-primary"
              >
                Создать первый курс
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="card"
                  onClick={() => setSelectedCourse(course)}
                  style={{
                    cursor: 'pointer',
                    border: selectedCourse?.id === course.id ? '2px solid #667eea' : '2px solid transparent'
                  }}
                >
                  <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                    {course.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <span className="badge badge-primary">{course.category}</span>
                    <span className="badge badge-success">{course.level}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        openCourseModal(course)
                      }}
                      className="btn btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '14px' }}
                    >
                      <Edit size={16} />
                      Редактировать
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteCourse(course.id)
                      }}
                      className="btn btn-danger"
                      style={{ padding: '6px 12px', fontSize: '14px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lessons */}
        {selectedCourse && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
                Уроки: {selectedCourse.title}
              </h2>
              <button
                onClick={() => openLessonModal()}
                className="btn btn-primary"
              >
                <Plus size={20} />
                Добавить урок
              </button>
            </div>

            {lessons.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
                <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                  В этом курсе пока нет уроков
                </p>
                <button
                  onClick={() => openLessonModal()}
                  className="btn btn-primary"
                >
                  Добавить первый урок
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className="card">
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}>
                        {index + 1}
                      </div>

                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                          {lesson.title}
                        </h3>
                        <p style={{
                          color: '#6b7280',
                          fontSize: '14px',
                          marginBottom: '12px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {lesson.content}
                        </p>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => openLessonModal(lesson)}
                            className="btn btn-secondary"
                            style={{ padding: '6px 12px', fontSize: '14px' }}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteLesson(lesson.id)}
                            className="btn btn-danger"
                            style={{ padding: '6px 12px', fontSize: '14px' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Course Modal */}
      {showCourseModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }} onClick={() => {
          setShowCourseModal(false)
          resetCourseForm()
        }}>
          <div className="card" style={{ maxWidth: '600px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              {editingCourse ? 'Редактировать курс' : 'Создать курс'}
            </h2>

            <form onSubmit={handleSaveCourse}>
              <div className="input-group">
                <label className="input-label">Название</label>
                <input
                  type="text"
                  className="input"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Описание</label>
                <textarea
                  className="input"
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Категория</label>
                <input
                  type="text"
                  className="input"
                  value={courseForm.category}
                  onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Уровень</label>
                <select
                  className="input"
                  value={courseForm.level}
                  onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                >
                  <option value="beginner">Начальный</option>
                  <option value="intermediate">Средний</option>
                  <option value="advanced">Продвинутый</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Сохранить
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCourseModal(false)
                    resetCourseForm()
                  }}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lesson Modal */}
      {showLessonModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }} onClick={() => {
          setShowLessonModal(false)
          resetLessonForm()
        }}>
          <div className="card" style={{ maxWidth: '700px', width: '100%', maxHeight: '90vh', overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              {editingLesson ? 'Редактировать урок' : 'Создать урок'}
            </h2>

            <form onSubmit={handleSaveLesson}>
              <div className="input-group">
                <label className="input-label">Название урока</label>
                <input
                  type="text"
                  className="input"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Содержание</label>
                <textarea
                  className="input"
                  value={lessonForm.content}
                  onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })}
                  rows={8}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">URL видео (опционально)</label>
                <input
                  type="url"
                  className="input"
                  value={lessonForm.video_url}
                  onChange={(e) => setLessonForm({ ...lessonForm, video_url: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="input-group">
                  <label className="input-label">Порядковый номер</label>
                  <input
                    type="number"
                    className="input"
                    value={lessonForm.order}
                    onChange={(e) => setLessonForm({ ...lessonForm, order: parseInt(e.target.value) })}
                    min="1"
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Длительность (мин)</label>
                  <input
                    type="number"
                    className="input"
                    value={lessonForm.duration_minutes}
                    onChange={(e) => setLessonForm({ ...lessonForm, duration_minutes: parseInt(e.target.value) })}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Сохранить
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLessonModal(false)
                    resetLessonForm()
                  }}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


