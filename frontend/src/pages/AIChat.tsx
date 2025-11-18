import { useState, useEffect, useRef } from 'react'
import { aiService } from '../api/services'
import { Send, MessageSquare, Bot, User, Sparkles, HelpCircle, FileText, Search } from 'lucide-react'

interface Message {
  id: number
  message: string
  response: string
  message_type: string
  created_at: string
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [messageType, setMessageType] = useState('help')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchHistory()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchHistory = async () => {
    try {
      const response = await aiService.getChatHistory()
      setMessages(response.data.slice(0, 20))
    } catch (error) {
      console.error('Error fetching chat history:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    setLoading(true)
    const userMessage = input
    setInput('')

    try {
      const response = await aiService.chat({
        message: userMessage,
        message_type: messageType
      })

      const newMessage: Message = {
        id: response.data.message_id,
        message: userMessage,
        response: response.data.response,
        message_type: messageType,
        created_at: new Date().toISOString()
      }

      setMessages(prev => [newMessage, ...prev])
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Ошибка при отправке сообщения')
    } finally {
      setLoading(false)
    }
  }

  const messageTypes = [
    { value: 'help', label: 'Помощь', icon: HelpCircle, color: '#667eea' },
    { value: 'hint', label: 'Подсказка', icon: Sparkles, color: '#f59e0b' },
    { value: 'summary', label: 'Конспект', icon: FileText, color: '#10b981' },
    { value: 'material_search', label: 'Поиск материалов', icon: Search, color: '#764ba2' }
  ]

  const currentType = messageTypes.find(t => t.value === messageType) || messageTypes[0]

  return (
    <div className="container">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '40px',
          fontWeight: 'bold',
          marginBottom: '16px',
          color: 'white'
        }}>
          AI Помощник
        </h1>
        <p style={{ fontSize: '18px', color: 'white', opacity: 0.9 }}>
          Задайте любой вопрос по обучению - AI поможет вам!
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {messageTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setMessageType(type.value)}
            className="card"
            style={{
              cursor: 'pointer',
              border: messageType === type.value ? `2px solid ${type.color}` : '2px solid transparent',
              transition: 'all 0.3s',
              textAlign: 'left'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px'
            }}>
              <div style={{
                padding: '8px',
                background: `${type.color}15`,
                borderRadius: '8px'
              }}>
                <type.icon size={20} color={type.color} />
              </div>
              <span style={{ fontWeight: 'bold' }}>{type.label}</span>
            </div>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              {type.value === 'help' && 'Получите помощь по курсу'}
              {type.value === 'hint' && 'Подсказка без прямого ответа'}
              {type.value === 'summary' && 'Создание конспектов'}
              {type.value === 'material_search' && 'Найти нужные материалы'}
            </p>
          </button>
        ))}
      </div>

      <div className="card" style={{ 
        height: '60vh', 
        display: 'flex', 
        flexDirection: 'column',
        padding: 0,
        overflow: 'hidden'
      }}>
        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column-reverse',
          gap: '16px'
        }}>
          <div ref={messagesEndRef} />
          
          {messages.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '48px 24px',
              color: '#6b7280'
            }}>
              <Bot size={64} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                Начните разговор с AI помощником
              </h3>
              <p>Выберите тип запроса и задайте свой вопрос</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* AI Response */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Bot size={20} color="white" />
                  </div>
                  <div style={{
                    background: '#f3f4f6',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    maxWidth: '80%',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {msg.response}
                  </div>
                </div>

                {/* User Message */}
                <div style={{ 
                  display: 'flex', 
                  gap: '12px', 
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    maxWidth: '80%',
                    lineHeight: '1.6'
                  }}>
                    {msg.message}
                  </div>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <User size={20} color="#6b7280" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <form 
          onSubmit={handleSubmit}
          style={{
            padding: '24px',
            borderTop: '1px solid #e5e7eb',
            background: '#f9fafb'
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{
              padding: '12px',
              background: `${currentType.color}15`,
              borderRadius: '8px'
            }}>
              <currentType.icon size={20} color={currentType.color} />
            </div>
            
            <input
              type="text"
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Задайте вопрос (${currentType.label})...`}
              disabled={loading}
              style={{ flex: 1, margin: 0 }}
            />
            
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !input.trim()}
            >
              {loading ? (
                'Отправка...'
              ) : (
                <>
                  <Send size={20} />
                  Отправить
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


