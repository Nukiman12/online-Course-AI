import { useEffect, useState } from 'react'
import { materialsService } from '../api/services'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { FileText, Loader2, RefreshCw, Sparkles } from 'lucide-react'

interface Material {
  id: number
  course_id: number
  title: string
  content: string
  material_type: string
  generated_by_ai: boolean
  created_at: string
}

export default function MyMaterials() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    setLoading(true)
    try {
      const res = await materialsService.getMyMaterials()
      setMaterials(res.data || [])
    } catch (e) {
      console.error('Ошибка загрузки моих материалов', e)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await load()
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <div className="container">
      {/* Header */}
      <div
        style={{
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '16px',
          alignItems: 'flex-end',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 10px',
              borderRadius: 9999,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.16)',
              marginBottom: 10,
            }}
          >
            <Sparkles size={16} color="#fbbf24" />
            <span
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: 1.2,
                color: 'rgba(255,255,255,0.9)',
              }}
            >
              AI Конспекты
            </span>
          </div>

          <h1
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '6px',
              color: 'white',
            }}
          >
            Мои материалы
          </h1>
          <p style={{ fontSize: 16, color: 'white', opacity: 0.85, maxWidth: 620 }}>
            Здесь собираются все конспекты и материалы, которые AI подготовил по
            вашим курсам. Открывайте, перечитывайте, используйте для подготовки
            к занятиям и экзаменам.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 8,
          }}
        >
          <button
            onClick={handleRefresh}
            className="btn btn-secondary"
            disabled={refreshing}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            {refreshing ? (
              <>
                <Loader2 size={18} className="spin" />
                Обновление...
              </>
            ) : (
              <>
                <RefreshCw size={18} />
                Обновить
              </>
            )}
          </button>
          <div
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.7)',
              textAlign: 'right',
            }}
          >
            Всего материалов: <b>{materials.length}</b>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="card" style={{ padding: '24px', minHeight: '60vh' }}>
        {loading ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              padding: '40px 0',
            }}
          >
            <Loader2 size={32} className="spin" />
            <p style={{ color: '#6b7280' }}>Загружаем ваши материалы...</p>
          </div>
        ) : materials.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 16px',
              maxWidth: 520,
              margin: '0 auto',
            }}
          >
            <FileText
              size={48}
              color="#9ca3af"
              style={{ margin: '0 auto 16px' }}
            />
            <h3
              style={{
                fontSize: 20,
                marginBottom: 8,
                color: '#111827',
                fontWeight: 600,
              }}
            >
              Пока нет материалов
            </h3>
            <p style={{ color: '#6b7280', fontSize: 14 }}>
              Откройте любой курс и нажмите кнопку
              <br />
              <b>«Сгенерировать конспект»</b> — он появится здесь автоматически.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {materials.map((mat) => (
              <div
                key={mat.id}
                className="card"
                style={{
                  padding: '16px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  minHeight: 200,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                    alignItems: 'flex-start',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 4,
                      }}
                    >
                      <FileText size={18} color="#4b5563" />
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: 15,
                          color: '#111827',
                        }}
                      >
                        {mat.title}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: '#6b7280',
                      }}
                    >
                      Курс ID: {mat.course_id} ·{' '}
                      {new Date(mat.created_at).toLocaleString('ru-RU')} ·{' '}
                      {mat.material_type}
                    </div>
                  </div>

                  {mat.generated_by_ai && (
                    <span
                      style={{
                        fontSize: 11,
                        padding: '4px 8px',
                        borderRadius: 9999,
                        background: '#DBEAFE',
                        color: '#1D4ED8',
                        height: 'fit-content',
                        textTransform: 'uppercase',
                        letterSpacing: 0.8,
                        fontWeight: 600,
                      }}
                    >
                      AI
                    </span>
                  )}
                </div>

                <div
                  style={{
                    marginTop: 8,
                    fontSize: 14,
                    color: '#374151',
                    maxHeight: 220,
                    overflow: 'auto',
                    borderTop: '1px solid #E5E7EB',
                    paddingTop: 8,
                  }}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: (props) => (
                        <p style={{ marginBottom: '8px' }} {...props} />
                      ),
                      li: (props) => (
                        <li style={{ marginBottom: '4px' }} {...props} />
                      ),
                      ul: (props) => (
                        <ul
                          style={{
                            paddingLeft: '1.25rem',
                            marginBottom: '8px',
                          }}
                          {...props}
                        />
                      ),
                      ol: (props) => (
                        <ol
                          style={{
                            paddingLeft: '1.25rem',
                            marginBottom: '8px',
                          }}
                          {...props}
                        />
                      ),
                    }}
                  >
                    {mat.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* маленький css для крутилки */}
      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
