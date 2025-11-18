import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { authService } from '../api/services'
import { UserPlus, User, Mail, Lock, GraduationCap, ArrowRight, Crown } from 'lucide-react'

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    password: '',
    confirm_password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirm_password) {
      setError('Пароли не совпадают')
      return
    }

    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов')
      return
    }

    setLoading(true)

    try {
      const registerData = {
        username: formData.username,
        email: formData.email,
        full_name: formData.full_name,
        password: formData.password
      }
      await authService.register(registerData)
      
      // Auto login after registration
      const loginResponse = await authService.login({
        username: formData.username,
        password: formData.password
      })
      const { user, access_token } = loginResponse.data
      setAuth(user, access_token)
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка при регистрации')
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
        maxWidth: '520px'
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
            Регистрация
          </h1>
          <div className="decorative-line" />
          <p style={{
            fontSize: '16px',
            color: '#666666',
            marginTop: '16px',
            lineHeight: '1.7'
          }}>
            Присоединяйтесь к элитному сообществу
          </p>
        </div>

        {/* Register Card */}
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
                  name="username"
                  className="input"
                  value={formData.username}
                  onChange={handleChange}
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
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  name="email"
                  className="input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Введите email"
                  required
                  style={{
                    paddingLeft: '52px',
                    fontSize: '16px',
                    border: '2px solid #e0e0e0'
                  }}
                />
                <Mail 
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
                Полное имя
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="full_name"
                  className="input"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Введите полное имя"
                  required
                  style={{
                    paddingLeft: '52px',
                    fontSize: '16px',
                    border: '2px solid #e0e0e0'
                  }}
                />
                <GraduationCap 
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
                  name="password"
                  className="input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Минимум 6 символов"
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

            <div className="input-group">
              <label className="input-label">
                Подтвердите пароль
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  name="confirm_password"
                  className="input"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="Повторите пароль"
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
                  Регистрация...
                </>
              ) : (
                <>
                  Зарегистрироваться
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
            Уже есть аккаунт?{' '}
            <Link
              to="/login"
              style={{
                color: '#000000',
                fontWeight: 700,
                textDecoration: 'underline',
                textUnderlineOffset: '4px'
              }}
            >
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
