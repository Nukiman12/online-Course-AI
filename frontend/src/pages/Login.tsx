import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { authService } from '../api/services'
import { LogIn, GraduationCap } from 'lucide-react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authService.login({ username, password })
      const { user, access_token } = response.data
      setAuth(user, access_token)
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка при входе')
    } finally {
      setLoading(false)
    }
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
        maxWidth: '450px',
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
            Добро пожаловать в EduAI
          </h1>
          <p style={{ color: '#6b7280' }}>
            Войдите в свой аккаунт для продолжения
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
            <label className="input-label">Имя пользователя</label>
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя пользователя"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Пароль</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={loading}
          >
            <LogIn size={20} />
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          color: '#6b7280'
        }}>
          Нет аккаунта?{' '}
          <Link
            to="/register"
            style={{
              color: '#667eea',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Зарегистрироваться
          </Link>
        </div>

        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: '#f3f4f6',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <p style={{ fontWeight: 600, marginBottom: '8px' }}>Тестовые аккаунты:</p>
          <p>Студент: student / password</p>
          <p>Преподаватель: teacher / password</p>
        </div>
      </div>
    </div>
  )
}


