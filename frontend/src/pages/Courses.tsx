import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { courseService } from '../api/services'
import { BookOpen, Clock, TrendingUp, Search } from 'lucide-react'

interface Course {
  id: number
  title: string
  description: string
  category: string
  level: string
  image_url?: string
  instructor_id: number
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await courseService.getCourses()
      setCourses(response.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory
    return matchesSearch && matchesLevel && matchesCategory
  })

  const categories = [...new Set(courses.map(c => c.category))]

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return '#10b981'
      case 'intermediate': return '#f59e0b'
      case 'advanced': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return 'Начальный'
      case 'intermediate': return 'Средний'
      case 'advanced': return 'Продвинутый'
      default: return level
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
          Каталог курсов
        </h1>
        <p style={{ fontSize: '18px', color: 'white', opacity: 0.9 }}>
          Выберите курс и начните обучение с AI помощником
        </p>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          <div>
            <label className="input-label">Поиск</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="input"
                placeholder="Поиск курсов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '40px' }}
              />
              <Search 
                size={20} 
                style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} 
              />
            </div>
          </div>

          <div>
            <label className="input-label">Уровень</label>
            <select
              className="input"
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              style={{ cursor: 'pointer' }}
            >
              <option value="all">Все уровни</option>
              <option value="beginner">Начальный</option>
              <option value="intermediate">Средний</option>
              <option value="advanced">Продвинутый</option>
            </select>
          </div>

          <div>
            <label className="input-label">Категория</label>
            <select
              className="input"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{ cursor: 'pointer' }}
            >
              <option value="all">Все категории</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '64px 24px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📚</div>
          <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>
            Курсы не найдены
          </h3>
          <p style={{ color: '#6b7280' }}>
            Попробуйте изменить параметры поиска
          </p>
        </div>
      ) : (
        <div className="grid grid-3">
          {filteredCourses.map((course, index) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div 
                className="card"
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  animation: `fadeIn 0.5s ease-out ${index * 0.05}s both`
                }}
              >
                <div style={{
                  height: '160px',
                  background: course.image_url 
                    ? `url(${course.image_url}) center/cover`
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {!course.image_url && (
                    <BookOpen size={48} color="white" />
                  )}
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    marginBottom: '12px',
                    flexWrap: 'wrap'
                  }}>
                    <span className="badge" style={{
                      background: `${getLevelColor(course.level)}15`,
                      color: getLevelColor(course.level)
                    }}>
                      <TrendingUp size={14} style={{ marginRight: '4px' }} />
                      {getLevelLabel(course.level)}
                    </span>
                    <span className="badge badge-primary">
                      {course.category}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                    color: '#111827'
                  }}>
                    {course.title}
                  </h3>

                  <p style={{
                    color: '#6b7280',
                    marginBottom: '16px',
                    flex: 1,
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {course.description}
                  </p>

                  <button className="btn btn-primary" style={{ width: '100%' }}>
                    Подробнее
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}


