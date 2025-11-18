# Backend - EduAI API

## Структура проекта

```
backend/
├── main.py              # Главный файл приложения с API эндпоинтами
├── database.py          # Настройка базы данных
├── models.py            # Модели базы данных (SQLAlchemy)
├── schemas.py           # Pydantic схемы для валидации
├── auth.py              # Аутентификация и авторизация
├── ai_service.py        # Сервис для работы с OpenAI API
├── requirements.txt     # Зависимости Python
├── .env                 # Переменные окружения (не коммитить!)
└── eduai.db            # База данных SQLite (создается автоматически)
```

## Модели базы данных

### User (Пользователь)
- id, email, username, hashed_password
- full_name, role (student/teacher/admin)
- created_at

### Course (Курс)
- id, title, description
- category, level, image_url
- instructor_id, created_at

### Lesson (Урок)
- id, course_id, title, content
- video_url, order, duration_minutes
- created_at

### Enrollment (Запись на курс)
- id, user_id, course_id
- enrolled_at, progress, completed

### ChatMessage (Сообщения чата с AI)
- id, user_id, course_id
- message, response, message_type
- created_at

### CourseMaterial (Учебные материалы)
- id, course_id, title, content
- material_type, generated_by_ai
- created_at

### Assignment (Задания)
- id, lesson_id, student_id
- title, description, submission
- grade, ai_feedback, status
- due_date, submitted_at, created_at

### Schedule (Расписание)
- id, user_id, course_id, lesson_id
- title, description, scheduled_time
- duration_minutes, completed
- created_at

## API Endpoints

Полная документация доступна по адресу: http://localhost:8000/docs

## Запуск

```bash
# Установка зависимостей
pip install -r requirements.txt

# Настройка .env файла
# OPENAI_API_KEY=your-key

# Запуск сервера
python main.py
```

Сервер запустится на http://localhost:8000


