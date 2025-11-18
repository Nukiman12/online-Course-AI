# 🎯 НАЧНИТЕ ЗДЕСЬ!

## 👋 Добро пожаловать в EduAI!

Вы только что получили **полнофункциональную платформу** онлайн-образования с реальным AI (OpenAI GPT-4)!

---

## ⚡ Быстрый старт (5 минут)

### Шаг 1️⃣: Установка (одна команда!)

**Windows:**
```bash
install.bat
```

**Mac/Linux:**
```bash
bash install.sh
```

Это установит все зависимости автоматически!

### Шаг 2️⃣: Настройка OpenAI API ключа

1. Получите ключ: https://platform.openai.com/api-keys
2. Откройте файл `backend/.env`
3. Замените:
```env
OPENAI_API_KEY=your-openai-api-key-here
```
на
```env
OPENAI_API_KEY=sk-ваш-настоящий-ключ
```

### Шаг 3️⃣: Запуск (одна команда!)

**Windows:**
```bash
start.bat
```

**Mac/Linux:**
```bash
bash start.sh
```

### Шаг 4️⃣: Откройте браузер

Автоматически откроется: **http://localhost:5173**

Или откройте вручную:
- 🎨 Frontend: http://localhost:5173
- 🔧 Backend API: http://localhost:8000
- 📚 API Docs: http://localhost:8000/docs

---

## 🎓 Первое использование

### Тестовые аккаунты уже созданы!

**Войдите как студент:**
- Username: `student`
- Password: `password`

**Войдите как преподаватель:**
- Username: `teacher`
- Password: `password`

### Тестовые курсы уже созданы!

✅ Введение в Python (3 урока)  
✅ Машинное обучение (2 урока)  
✅ Web разработка с React (2 урока)

---

## 🚀 Что дальше?

### Как студент:
1. ✅ Просмотрите курсы → **"Все курсы"**
2. ✅ Запишитесь на курс → нажмите **"Записаться"**
3. ✅ Изучайте материалы
4. ✅ Спросите AI → **"AI Помощник"**
5. ✅ Генерируйте конспекты → кнопка в курсе

### Как преподаватель:
1. ✅ Создайте курс → **"Панель преподавателя"**
2. ✅ Добавьте уроки → кнопка **"Добавить урок"**
3. ✅ Используйте AI для материалов
4. ✅ Проверяйте работы студентов

---

## 📚 Документация

Выберите нужную документацию:

### 🏃 Быстро начать:
- 📖 **[README.md](README.md)** - полная документация
- ⚡ **[QUICKSTART.md](QUICKSTART.md)** - быстрый старт
- 👤 **[USER_GUIDE.md](USER_GUIDE.md)** - руководство пользователя

### 💡 Узнать больше:
- ❓ **[FAQ.md](FAQ.md)** - частые вопросы
- ✨ **[FEATURES.md](FEATURES.md)** - все функции
- 📁 **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - структура проекта

### 🚀 Для разработчиков:
- 📊 **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - сводка проекта
- 🌐 **[DEPLOYMENT.md](DEPLOYMENT.md)** - развертывание

---

## 🤖 AI Функции

Все работают с **реальным OpenAI GPT-4**!

### 1. 💬 Чат-помощник
Отвечает на вопросы, объясняет концепции

### 2. 💡 Умные подсказки
Направляет мышление без прямых ответов

### 3. 📝 Генерация конспектов
Автоматические краткие конспекты курсов

### 4. 🔍 Поиск материалов
Находит релевантные ресурсы и книги

### 5. ✅ Проверка заданий
Автоматическая проверка работ студентов

### 6. 📚 Генерация материалов
Создание практических заданий и тестов

### 7. 📅 Умное расписание
Оптимальное планирование обучения

---

## ⚠️ Важно знать

### OpenAI API:
- 🔑 **Нужен API ключ** от OpenAI
- 💳 **Платный сервис** (~$0.03-0.06 за 1000 токенов)
- 🎁 **Бесплатные кредиты** при регистрации
- 💰 **$5-10** достаточно для тестирования

### Альтернатива:
Можно изменить модель на `gpt-3.5-turbo` (дешевле) в файле `backend/ai_service.py`

---

## 🎯 Структура проекта

```
module/
├── 📂 backend/          # Python FastAPI
│   ├── main.py          # API endpoints
│   ├── ai_service.py    # OpenAI интеграция
│   ├── models.py        # База данных
│   └── ...
│
├── 📂 frontend/         # React TypeScript
│   ├── src/
│   │   ├── pages/       # Страницы
│   │   ├── components/  # Компоненты
│   │   └── api/         # API сервисы
│   └── ...
│
└── 📚 Документация
```

---

## 💻 Команды

### Установка:
```bash
install.bat         # Windows
bash install.sh     # Mac/Linux
```

### Запуск:
```bash
start.bat           # Windows
bash start.sh       # Mac/Linux
```

### Ручной запуск:

**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate    # Windows
source venv/bin/activate # Mac/Linux
pip install -r requirements.txt
python main.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 🆘 Проблемы?

### Backend не запускается:
```bash
cd backend
pip install --upgrade pip
pip install -r requirements.txt
```

### Frontend не запускается:
```bash
cd frontend
rm -rf node_modules
npm install
```

### AI не работает:
- Проверьте API ключ в `backend/.env`
- Убедитесь, что ключ валидный
- Проверьте баланс на OpenAI

---

## 📞 Нужна помощь?

1. ✅ Прочитайте [FAQ.md](FAQ.md)
2. ✅ Проверьте [README.md](README.md)
3. ✅ Посмотрите [USER_GUIDE.md](USER_GUIDE.md)
4. ✅ Проверьте логи в терминале

---

## 🎉 Готово!

Теперь у вас есть **полнофункциональная платформа** онлайн-образования с AI!

### Что особенного:
✅ Реальный AI (OpenAI GPT-4)  
✅ 7 различных AI функций  
✅ Полностью рабочий код  
✅ Красивый современный UI  
✅ Production-ready  
✅ Отличная документация  

---

## 🚀 Начните прямо сейчас!

```bash
# 1. Установите
install.bat  # или bash install.sh

# 2. Настройте API ключ в backend/.env

# 3. Запустите
start.bat    # или bash start.sh

# 4. Откройте http://localhost:5173
```

---

**Приятного использования EduAI! 🎓✨**

*Создано с ❤️ для образования будущего*


