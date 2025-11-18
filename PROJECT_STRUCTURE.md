# 📁 Структура проекта EduAI

```
module/
│
├── 📄 README.md                 # Главная документация
├── 📄 QUICKSTART.md            # Быстрый старт
├── 📄 FAQ.md                   # Часто задаваемые вопросы
├── 📄 FEATURES.md              # Полный список функций
├── 📄 PROJECT_STRUCTURE.md     # Этот файл
├── 📄 .gitignore               # Игнорируемые файлы Git
├── 🚀 start.bat                # Автозапуск (Windows)
└── 🚀 start.sh                 # Автозапуск (Mac/Linux)
│
├── 📂 backend/                 # Backend приложение
│   │
│   ├── 📄 main.py              # Главный файл с API endpoints
│   ├── 📄 database.py          # Конфигурация базы данных
│   ├── 📄 models.py            # Модели SQLAlchemy
│   ├── 📄 schemas.py           # Pydantic схемы
│   ├── 📄 auth.py              # Аутентификация и JWT
│   ├── 📄 ai_service.py        # Сервис OpenAI интеграции
│   ├── 📄 init_db.py           # Скрипт инициализации БД
│   │
│   ├── 📄 requirements.txt     # Python зависимости
│   ├── 📄 .env                 # Переменные окружения
│   ├── 📄 README.md            # Backend документация
│   │
│   ├── 📂 venv/                # Виртуальное окружение (создается)
│   └── 📄 eduai.db             # База данных SQLite (создается)
│
└── 📂 frontend/                # Frontend приложение
    │
    ├── 📄 package.json         # npm зависимости
    ├── 📄 tsconfig.json        # TypeScript конфигурация
    ├── 📄 vite.config.ts       # Vite конфигурация
    ├── 📄 index.html           # HTML entry point
    ├── 📄 README.md            # Frontend документация
    │
    └── 📂 src/                 # Исходный код
        │
        ├── 📄 main.tsx         # Entry point приложения
        ├── 📄 App.tsx          # Главный компонент с роутингом
        ├── 📄 index.css        # Глобальные стили
        │
        ├── 📂 api/             # API слой
        │   ├── 📄 axios.ts     # Axios конфигурация
        │   └── 📄 services.ts  # API сервисы
        │
        ├── 📂 store/           # State management
        │   └── 📄 authStore.ts # Zustand store для auth
        │
        ├── 📂 components/      # React компоненты
        │   └── 📄 Layout.tsx   # Layout с навигацией
        │
        └── 📂 pages/           # Страницы приложения
            ├── 📄 Login.tsx            # Страница входа
            ├── 📄 Register.tsx         # Регистрация
            ├── 📄 Home.tsx             # Главная
            ├── 📄 Courses.tsx          # Каталог курсов
            ├── 📄 CourseDetail.tsx     # Детали курса
            ├── 📄 MyCourses.tsx        # Мои курсы
            ├── 📄 AIChat.tsx           # AI помощник
            ├── 📄 Dashboard.tsx        # Панель студента
            └── 📄 TeacherDashboard.tsx # Панель преподавателя
```

## 📝 Описание файлов

### 🔝 Корневая директория

#### README.md
- Главная документация проекта
- Инструкции по установке и запуску
- Описание функций и возможностей
- API документация

#### QUICKSTART.md
- Быстрое руководство по запуску
- Минимальные шаги для начала работы
- Решение базовых проблем

#### FAQ.md
- Часто задаваемые вопросы
- Решение распространенных проблем
- Полезные советы

#### FEATURES.md
- Детальное описание всех функций
- Возможности для студентов
- Возможности для преподавателей
- AI функции

#### .gitignore
- Файлы для игнорирования Git
- Виртуальные окружения
- База данных
- node_modules

#### start.bat / start.sh
- Автоматический запуск проекта
- Установка зависимостей
- Запуск backend и frontend

---

### 🔙 Backend (`/backend`)

#### main.py (600+ строк)
**Главный файл приложения**
- FastAPI приложение
- Все API endpoints
- CORS настройки
- Группы endpoints:
  - 🔐 Auth (регистрация, вход)
  - 📚 Courses (CRUD курсов)
  - 📖 Lessons (CRUD уроков)
  - 👥 Enrollments (записи на курсы)
  - 🤖 AI (чат, генерация)
  - 📝 Assignments (задания)
  - 📅 Schedule (расписание)

#### database.py
**Конфигурация базы данных**
- SQLAlchemy настройки
- Connection pool
- Session management
- Base для моделей

#### models.py (200+ строк)
**Модели базы данных**
- User - пользователи
- Course - курсы
- Lesson - уроки
- Enrollment - записи
- ChatMessage - сообщения AI
- CourseMaterial - материалы
- Assignment - задания
- Schedule - расписание

#### schemas.py (150+ строк)
**Pydantic схемы**
- Валидация входных данных
- Сериализация ответов
- Type hints
- API contracts

#### auth.py
**Аутентификация**
- JWT токены
- Хеширование паролей
- Проверка прав доступа
- Middleware для защиты endpoints

#### ai_service.py (400+ строк)
**OpenAI интеграция**
- Чат с AI
- Генерация конспектов
- Создание материалов
- Проверка заданий
- Генерация расписания
- Рекомендации ресурсов

#### init_db.py
**Инициализация БД**
- Создание таблиц
- Тестовые пользователи
- Примеры курсов
- Примеры уроков

#### requirements.txt
**Python зависимости**
```
fastapi
uvicorn
sqlalchemy
pydantic
python-jose
passlib
openai
python-dotenv
aiosqlite
```

#### .env
**Переменные окружения**
```env
OPENAI_API_KEY=your-key
SECRET_KEY=your-secret
DATABASE_URL=sqlite:///./eduai.db
```

---

### 🎨 Frontend (`/frontend`)

#### package.json
**npm зависимости**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.2",
    "zustand": "^4.4.7",
    "lucide-react": "^0.294.0"
  }
}
```

#### vite.config.ts
**Vite конфигурация**
- React plugin
- Proxy для API
- Build настройки

#### src/main.tsx
**Entry point**
- ReactDOM render
- React Query setup
- Router setup

#### src/App.tsx
**Главный компонент**
- Роутинг всех страниц
- Защищенные маршруты
- Role-based доступ

#### src/index.css
**Глобальные стили**
- CSS переменные
- Utility классы
- Анимации
- Адаптивность

---

### 🔌 API Слой (`/frontend/src/api`)

#### axios.ts
- Axios instance
- Request interceptor (добавление токена)
- Response interceptor (обработка ошибок)
- Auto logout при 401

#### services.ts
**API сервисы**
- authService - аутентификация
- courseService - курсы
- lessonService - уроки
- enrollmentService - записи
- aiService - AI функции
- assignmentService - задания
- scheduleService - расписание

---

### 💾 State Management (`/frontend/src/store`)

#### authStore.ts
**Zustand store**
- user - текущий пользователь
- token - JWT токен
- setAuth() - установка auth
- logout() - выход
- isAuthenticated() - проверка
- isTeacher() - проверка роли

---

### 🧩 Компоненты (`/frontend/src/components`)

#### Layout.tsx
**Главный layout**
- Навигационная панель
- User menu
- Footer
- Outlet для страниц
- Адаптивное меню

---

### 📄 Страницы (`/frontend/src/pages`)

#### Login.tsx
- Форма входа
- Валидация
- Обработка ошибок
- Редирект после входа

#### Register.tsx
- Форма регистрации
- Выбор роли
- Валидация паролей
- Auto login после регистрации

#### Home.tsx
- Welcome screen
- Статистика платформы
- Функции платформы
- Call-to-action

#### Courses.tsx
- Каталог курсов
- Поиск и фильтрация
- Карточки курсов
- Pagination

#### CourseDetail.tsx
- Детали курса
- Список уроков
- Запись на курс
- Генерация конспекта
- Просмотр уроков

#### MyCourses.tsx
- Записанные курсы
- Прогресс обучения
- Статистика
- Быстрый доступ

#### AIChat.tsx
- Чат интерфейс
- Типы запросов
- История сообщений
- Real-time ответы

#### Dashboard.tsx
- Статистика студента
- Предстоящие занятия
- Задания
- Быстрые действия

#### TeacherDashboard.tsx
- Управление курсами
- Управление уроками
- Создание/редактирование
- Статистика преподавателя

---

## 🗄️ База данных

### Таблицы

#### users
- id, email, username
- hashed_password, full_name
- role, created_at

#### courses
- id, title, description
- category, level, image_url
- instructor_id, created_at

#### lessons
- id, course_id, title
- content, video_url
- order, duration_minutes
- created_at

#### enrollments
- id, user_id, course_id
- enrolled_at, progress, completed

#### chat_messages
- id, user_id, course_id
- message, response
- message_type, created_at

#### course_materials
- id, course_id, title
- content, material_type
- generated_by_ai, created_at

#### assignments
- id, lesson_id, student_id
- title, description, submission
- grade, ai_feedback, status
- due_date, submitted_at, created_at

#### schedules
- id, user_id, course_id, lesson_id
- title, description
- scheduled_time, duration_minutes
- completed, created_at

---

## 🔄 Поток данных

### Аутентификация
```
User → Frontend (Login) → Backend API → JWT Token → Frontend Store → Local Storage
```

### Создание курса
```
Teacher → TeacherDashboard → courseService.create() → Backend API → Database → Response
```

### AI Чат
```
Student → AIChat → aiService.chat() → Backend → OpenAI API → AI Response → Frontend
```

### Запись на курс
```
Student → CourseDetail → enrollmentService.enroll() → Backend → Database → Update UI
```

---

## 🎯 Точки входа

### Development
- Backend: `python backend/main.py`
- Frontend: `npm run dev` (в /frontend)

### Production Build
- Backend: `uvicorn backend.main:app`
- Frontend: `npm run build` → `dist/`

### API Docs
- Swagger: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## 📦 Зависимости

### Backend Dependencies
- **FastAPI** - Web framework
- **SQLAlchemy** - ORM
- **Pydantic** - Validation
- **OpenAI** - AI integration
- **Python-jose** - JWT
- **Passlib** - Password hashing

### Frontend Dependencies
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Zustand** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **Lucide** - Icons

---

## 🔐 Безопасность

### Backend
- ✅ JWT аутентификация
- ✅ Bcrypt хеширование
- ✅ Role-based access
- ✅ Input validation
- ✅ CORS настройки

### Frontend
- ✅ Token в headers
- ✅ Auto logout
- ✅ Protected routes
- ✅ Form validation
- ✅ XSS protection

---

**Это полная структура проекта EduAI! 🎓**


