# 🚀 Быстрый старт EduAI

## Шаг 1: Установка Backend (5 минут)

```bash
# Перейдите в директорию backend
cd backend

# Создайте виртуальное окружение
python -m venv venv

# Активируйте его
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Установите зависимости
pip install -r requirements.txt
```

## Шаг 2: Настройка OpenAI API

1. Получите API ключ на https://platform.openai.com/api-keys
2. Откройте файл `backend/.env`
3. Замените `your-openai-api-key-here` на ваш ключ:

```env
OPENAI_API_KEY=sk-ваш-настоящий-ключ
```

## Шаг 3: Установка Frontend (5 минут)

```bash
# Откройте НОВЫЙ терминал
cd frontend

# Установите зависимости
npm install
```

## Шаг 4: Запуск приложения

**Терминал 1 (Backend):**
```bash
cd backend
# Активируйте venv если еще не активирован
python main.py
```
✅ Backend работает на http://localhost:8000

**Терминал 2 (Frontend):**
```bash
cd frontend
npm run dev
```
✅ Frontend работает на http://localhost:5173

## Шаг 5: Начало работы

1. Откройте браузер: **http://localhost:5173**
2. Нажмите "Зарегистрироваться"
3. Создайте аккаунт:
   - **Преподаватель** - для создания курсов
   - **Студент** - для обучения

## 🎉 Готово!

Теперь вы можете:
- ✅ Создавать курсы (как преподаватель)
- ✅ Записываться на курсы (как студент)
- ✅ Общаться с AI помощником
- ✅ Генерировать конспекты
- ✅ Использовать умные подсказки

## 🆘 Проблемы?

### Backend не запускается:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Frontend не запускается:
```bash
rm -rf node_modules
npm install
```

### AI не работает:
- Проверьте OpenAI API ключ в `backend/.env`
- Убедитесь, что у вас есть кредиты на аккаунте OpenAI

---

**Приятного использования! 🚀**


