import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { authService } from '../api/services'
import { UserPlus, GraduationCap } from 'lucide-react'

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    full_name: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают')
      return
    }

    setLoading(true)

    try {
      const { confirmPassword, ...registerData } = formData
      const response = await authService.register(registerData)
      const { user, access_token } = response.data
      setAuth(user, access_token)
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка при регистрации')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="card" style={{
        maxWidth: '500px',
        width: '100%',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            padding: '16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            marginBottom: '16px'
          }}>
            <GraduationCap size={40} color="white" />
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '8px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Регистрация в EduAI
          </h1>
          <p style={{ color: '#6b7280' }}>
            Создайте аккаунт и начните обучение
          </p>
        </div>

        {error && (
          <div style={{
            padding: '12px',
            background: '#fee2e2',
            color: '#991b1b',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Имя пользователя</label>
            <input
              type="text"
              name="username"
              className="input"
              value={formData.username}
              onChange={handleChange}
              placeholder="username"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Полное имя</label>
            <input
              type="text"
              name="full_name"
              className="input"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Иван Иванов"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Роль</label>
            <select
              name="role"
              className="input"
              value={formData.role}
              onChange={handleChange}
              style={{ cursor: 'pointer' }}
            >
              <option value="student">Студент</option>
              <option value="teacher">Преподаватель</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Пароль</label>
            <input
              type="password"
              name="password"
              className="input"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Подтвердите пароль</label>
            <input
              type="password"
              name="confirmPassword"
              className="input"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={loading}
          >
            <UserPlus size={20} />
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          color: '#6b7280'
        }}>
          Уже есть аккаунт?{' '}
          <Link
            to="/login"
            style={{
              color: '#667eea',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  )
}


