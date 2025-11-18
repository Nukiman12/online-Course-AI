# 🚀 Руководство по развертыванию EduAI

## 📋 Содержание
1. [Подготовка к развертыванию](#подготовка)
2. [Развертывание Backend](#backend)
3. [Развертывание Frontend](#frontend)
4. [База данных](#база-данных)
5. [Environment Variables](#переменные-окружения)
6. [SSL/HTTPS](#ssl)
7. [Мониторинг](#мониторинг)

---

## 🎯 Подготовка

### Чек-лист перед развертыванием:
- [ ] Тестирование локально работает
- [ ] OpenAI API ключ настроен
- [ ] База данных настроена
- [ ] Environment variables проверены
- [ ] .gitignore настроен
- [ ] Секретные ключи изменены

---

## 🔙 Backend

### Вариант 1: Heroku

#### Шаг 1: Подготовка
```bash
# Создайте Procfile
echo "web: uvicorn main:app --host=0.0.0.0 --port=${PORT:-8000}" > backend/Procfile

# Создайте runtime.txt
echo "python-3.11.0" > backend/runtime.txt
```

#### Шаг 2: Развертывание
```bash
# Установите Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Войдите в Heroku
heroku login

# Создайте приложение
heroku create eduai-backend

# Установите переменные окружения
heroku config:set OPENAI_API_KEY=your-key
heroku config:set SECRET_KEY=your-secret-key
heroku config:set DATABASE_URL=postgresql://...

# Деплой
cd backend
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a eduai-backend
git push heroku master
```

### Вариант 2: Railway.app

```bash
# 1. Создайте аккаунт на railway.app
# 2. Нажмите "New Project"
# 3. Выберите "Deploy from GitHub"
# 4. Выберите репозиторий
# 5. Настройте переменные окружения
# 6. Railway автоматически определит Python и запустит
```

### Вариант 3: DigitalOcean App Platform

```bash
# 1. Создайте аккаунт на DigitalOcean
# 2. Перейдите в App Platform
# 3. Create App → GitHub
# 4. Выберите репозиторий
# 5. Настройте:
#    - Build Command: pip install -r requirements.txt
#    - Run Command: uvicorn main:app --host 0.0.0.0 --port 8080
# 6. Добавьте environment variables
# 7. Deploy
```

### Вариант 4: VPS (Ubuntu)

```bash
# Подключитесь к серверу
ssh user@your-server-ip

# Обновите систему
sudo apt update && sudo apt upgrade -y

# Установите Python
sudo apt install python3 python3-pip python3-venv -y

# Клонируйте репозиторий
git clone https://github.com/yourusername/eduai.git
cd eduai/backend

# Создайте виртуальное окружение
python3 -m venv venv
source venv/bin/activate

# Установите зависимости
pip install -r requirements.txt

# Настройте .env файл
nano .env
# Добавьте все переменные

# Установите и настройте supervisor
sudo apt install supervisor -y

# Создайте конфиг supervisor
sudo nano /etc/supervisor/conf.d/eduai.conf
```

Конфиг supervisor:
```ini
[program:eduai]
directory=/home/user/eduai/backend
command=/home/user/eduai/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
user=user
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/var/log/eduai.log
```

```bash
# Перезапустите supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start eduai
```

---

## 🎨 Frontend

### Вариант 1: Vercel

```bash
# 1. Установите Vercel CLI
npm i -g vercel

# 2. Перейдите в директорию frontend
cd frontend

# 3. Деплой
vercel

# 4. Следуйте инструкциям
# 5. Настройте environment variables в Vercel dashboard
```

vercel.json:
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-backend-url.com/api/$1"
    }
  ]
}
```

### Вариант 2: Netlify

```bash
# 1. Создайте netlify.toml
cd frontend
cat > netlify.toml << EOF
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/api/*"
  to = "https://your-backend-url.com/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF

# 2. Установите Netlify CLI
npm i -g netlify-cli

# 3. Войдите
netlify login

# 4. Деплой
netlify deploy --prod
```

### Вариант 3: Cloudflare Pages

```bash
# 1. Перейдите на pages.cloudflare.com
# 2. Подключите GitHub репозиторий
# 3. Настройте:
#    - Build command: npm run build
#    - Build output: dist
#    - Root directory: frontend
# 4. Добавьте environment variables
# 5. Deploy
```

### Вариант 4: Статический хостинг (nginx)

```bash
# На сервере
cd frontend
npm install
npm run build

# Настройте nginx
sudo nano /etc/nginx/sites-available/eduai

# Конфиг nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/eduai/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Активируйте конфиг
sudo ln -s /etc/nginx/sites-available/eduai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🗄️ База данных

### PostgreSQL на Heroku

```bash
# Добавьте PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# Получите DATABASE_URL
heroku config:get DATABASE_URL

# Используйте этот URL в .env
```

### Supabase (PostgreSQL)

```bash
# 1. Создайте проект на supabase.com
# 2. Получите connection string
# 3. Обновите .env:
DATABASE_URL=postgresql://user:password@db.xxx.supabase.co:5432/postgres
```

### Миграция с SQLite на PostgreSQL

```bash
# 1. Установите psycopg2
pip install psycopg2-binary

# 2. Обновите database.py
# Измените DATABASE_URL на PostgreSQL

# 3. Создайте таблицы
python init_db.py
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
# Production values
OPENAI_API_KEY=sk-your-production-key
SECRET_KEY=very-long-random-secret-key-change-this
DATABASE_URL=postgresql://user:password@host:5432/dbname
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# Optional
ENVIRONMENT=production
DEBUG=False
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Frontend
Создайте `.env.production`:
```env
VITE_API_URL=https://your-backend-url.com/api
```

Обновите `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: import.meta.env.VITE_API_URL || 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
})
```

---

## 🔒 SSL/HTTPS

### Certbot (Let's Encrypt)

```bash
# Установите certbot
sudo apt install certbot python3-certbot-nginx -y

# Получите сертификат
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Автоматическое обновление
sudo certbot renew --dry-run
```

### Cloudflare SSL
1. Добавьте домен в Cloudflare
2. Измените nameservers
3. Включите SSL/TLS в режиме "Full"
4. Готово!

---

## 📊 Мониторинг

### Логирование

Backend (main.py):
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
```

### Мониторинг производительности

```bash
# Установите Sentry
pip install sentry-sdk[fastapi]
```

```python
import sentry_sdk

sentry_sdk.init(
    dsn="your-sentry-dsn",
    traces_sample_rate=1.0,
)
```

### Health Check

Добавьте в main.py:
```python
@app.get("/health")
def health_check():
    return {"status": "healthy"}
```

---

## 🔥 Production Checklist

### Backend
- [ ] DEBUG=False
- [ ] Уникальный SECRET_KEY
- [ ] PostgreSQL вместо SQLite
- [ ] Настроен CORS для production
- [ ] Логирование настроено
- [ ] SSL сертификат установлен
- [ ] Backup базы данных
- [ ] Rate limiting добавлен
- [ ] Health check endpoint

### Frontend
- [ ] API URL указывает на production
- [ ] Build оптимизирован
- [ ] Environment variables настроены
- [ ] Error tracking (Sentry)
- [ ] Analytics добавлен (опционально)
- [ ] SEO meta tags
- [ ] Favicon и manifest

### Безопасность
- [ ] Все секретные ключи изменены
- [ ] .env не в git
- [ ] HTTPS включен
- [ ] CORS настроен правильно
- [ ] SQL injection защита
- [ ] XSS защита
- [ ] Rate limiting

### Производительность
- [ ] Frontend минифицирован
- [ ] Изображения оптимизированы
- [ ] Кеширование настроено
- [ ] CDN для статики (опционально)
- [ ] Database индексы
- [ ] Connection pooling

---

## 🆘 Troubleshooting

### Backend не запускается
```bash
# Проверьте логи
heroku logs --tail
# или
sudo tail -f /var/log/eduai.log
```

### Database connection error
- Проверьте DATABASE_URL
- Убедитесь что БД доступна
- Проверьте firewall правила

### CORS errors
- Обновите ALLOWED_ORIGINS в .env
- Проверьте CORS настройки в main.py

### 502 Bad Gateway
- Backend не запущен или упал
- Проверьте логи
- Перезапустите backend

---

## 📚 Полезные ссылки

- [Heroku Python](https://devcenter.heroku.com/articles/getting-started-with-python)
- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)
- [Nginx Config](https://www.nginx.com/resources/wiki/start/)

---

**Готово! Ваш EduAI теперь в production! 🎉**


