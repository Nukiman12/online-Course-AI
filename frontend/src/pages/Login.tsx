import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { authService } from '../api/services'
import { LogIn, GraduationCap, Lock, User, ArrowRight, Crown } from 'lucide-react'

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
      padding: '20px',
      background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px'
      }}>
        {/* Logo & Brand */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '48px',
          animation: 'fadeInUp 0.8s ease-out'
        }}>
          <div style={{
            display: 'inline-flex',
            padding: '20px',
            background: '#000000',
            borderRadius: '20px',
            marginBottom: '28px',
            boxShadow: '8px 8px 0 #e0e0e0',
            border: '3px solid #000000'
          }}>
            <Crown size={48} color="white" />
          </div>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 900,
            marginBottom: '12px',
            color: '#000000',
            letterSpacing: '-2px',
            fontFamily: "'Playfair Display', serif"
          }}>
            Добро пожаловать
          </h1>
          <div className="decorative-line" />
          <p style={{
            fontSize: '16px',
            color: '#666666',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginTop: '16px'
          }}>
            EduAI Premium Education
          </p>
        </div>

        {/* Login Card */}
        <div className="card" style={{
          padding: '48px',
          animation: 'scaleIn 0.8s ease-out',
          border: '3px solid #000000',
          boxShadow: '12px 12px 0 #000000',
          background: 'white'
        }}>
          {error && (
            <div style={{
              padding: '16px 20px',
              background: '#f5f5f5',
              color: '#000000',
              borderRadius: '8px',
              marginBottom: '28px',
              textAlign: 'center',
              border: '2px solid #000000',
              fontSize: '15px',
              fontWeight: 600,
              animation: 'fadeIn 0.3s ease-out'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">
                Имя пользователя
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Введите имя пользователя"
                  required
                  style={{
                    paddingLeft: '52px',
                    fontSize: '16px',
                    border: '2px solid #e0e0e0'
                  }}
                />
                <User 
                  size={20} 
                  style={{
                    position: 'absolute',
                    left: '18px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#000000'
                  }}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                Пароль
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  required
                  style={{
                    paddingLeft: '52px',
                    fontSize: '16px',
                    border: '2px solid #e0e0e0'
                  }}
                />
                <Lock 
                  size={20} 
                  style={{
                    position: 'absolute',
                    left: '18px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#000000'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ 
                width: '100%', 
                justifyContent: 'center',
                fontSize: '15px',
                padding: '18px',
                marginTop: '12px'
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ 
                    width: '20px', 
                    height: '20px',
                    borderWidth: '2px'
                  }} />
                  Вход...
                </>
              ) : (
                <>
                  Войти
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div style={{
            marginTop: '32px',
            textAlign: 'center',
            fontSize: '15px',
            color: '#666666'
          }}>
            Нет аккаунта?{' '}
            <Link
              to="/register"
              style={{
                color: '#000000',
                fontWeight: 700,
                textDecoration: 'underline',
                textUnderlineOffset: '4px'
              }}
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>

        {/* Test Accounts Info */}
        <div style={{
          marginTop: '32px',
          padding: '28px',
          borderRadius: '16px',
          border: '2px solid #e0e0e0',
          background: 'white',
          animation: 'fadeIn 0.8s ease-out 0.4s both'
        }}>
          <div style={{
            fontWeight: 700, 
            fontSize: '13px',
            color: '#000000',
            marginBottom: '20px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textAlign: 'center'
          }}>
            Тестовые аккаунты
          </div>
          <div style={{
            display: 'grid',
            gap: '14px',
            fontSize: '14px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '14px 18px',
              background: '#f5f5f5',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <span style={{ fontWeight: 600 }}>👨‍🎓 Студент:</span>
              <code style={{ 
                fontFamily: 'monospace',
                fontWeight: 600,
                color: '#000000'
              }}>
                student / password
              </code>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '14px 18px',
              background: '#f5f5f5',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <span style={{ fontWeight: 600 }}>👨‍🏫 Преподаватель:</span>
              <code style={{ 
                fontFamily: 'monospace',
                fontWeight: 600,
                color: '#000000'
              }}>
                teacher / password
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
