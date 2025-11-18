"""
Скрипт для инициализации базы данных с тестовыми данными
"""
from database import engine, SessionLocal
import models
from auth import get_password_hash
from datetime import datetime, timedelta

# Создание таблиц
models.Base.metadata.create_all(bind=engine)

db = SessionLocal()

try:
    # Проверка существующих пользователей
    existing_users = db.query(models.User).count()
    
    if existing_users > 0:
        print("⚠️  База данных уже содержит данные. Пропускаем инициализацию.")
        print(f"   Найдено пользователей: {existing_users}")
    else:
        print("📝 Создание тестовых пользователей...")
        
        # Создание тестовых пользователей
        student = models.User(
            email="student@eduai.com",
            username="student",
            full_name="Иван Студентов",
            hashed_password=get_password_hash("password"),
            role="student"
        )
        
        teacher = models.User(
            email="teacher@eduai.com",
            username="teacher",
            full_name="Мария Преподавателева",
            hashed_password=get_password_hash("password"),
            role="teacher"
        )
        
        admin = models.User(
            email="admin@eduai.com",
            username="admin",
            full_name="Администратор",
            hashed_password=get_password_hash("password"),
            role="admin"
        )
        
        db.add_all([student, teacher, admin])
        db.commit()
        db.refresh(teacher)
        
        print("✅ Пользователи созданы:")
        print("   - student / password (Студент)")
        print("   - teacher / password (Преподаватель)")
        print("   - admin / password (Администратор)")
        
        print("\n📚 Создание тестовых курсов...")
        
        # Создание курсов
        course1 = models.Course(
            title="Введение в Python",
            description="Изучите основы программирования на Python с нуля. Курс охватывает переменные, циклы, функции и объектно-ориентированное программирование.",
            category="Программирование",
            level="beginner",
            instructor_id=teacher.id
        )
        
        course2 = models.Course(
            title="Машинное обучение",
            description="Погрузитесь в мир машинного обучения. Изучите алгоритмы, нейронные сети и практическое применение ML.",
            category="Data Science",
            level="intermediate",
            instructor_id=teacher.id
        )
        
        course3 = models.Course(
            title="Web разработка с React",
            description="Создавайте современные веб-приложения с помощью React. Изучите компоненты, хуки, состояние и маршрутизацию.",
            category="Web разработка",
            level="intermediate",
            instructor_id=teacher.id
        )
        
        db.add_all([course1, course2, course3])
        db.commit()
        
        print("✅ Курсы созданы:")
        print(f"   - {course1.title}")
        print(f"   - {course2.title}")
        print(f"   - {course3.title}")
        
        print("\n📖 Создание уроков...")
        
        # Уроки для курса Python
        lessons_python = [
            models.Lesson(
                course_id=course1.id,
                title="Введение в Python",
                content="""Добро пожаловать на курс Python!

Python - это высокоуровневый язык программирования, известный своей простотой и читаемостью. 

Основные преимущества Python:
1. Простой и понятный синтаксис
2. Огромная экосистема библиотек
3. Широкое применение: от веб-разработки до машинного обучения
4. Активное сообщество разработчиков

В этом курсе мы изучим основы Python и научимся создавать свои первые программы.""",
                order=1,
                duration_minutes=30
            ),
            models.Lesson(
                course_id=course1.id,
                title="Переменные и типы данных",
                content="""Переменные в Python

Переменная - это контейнер для хранения данных. В Python не нужно объявлять тип переменной.

Основные типы данных:
- int: целые числа (1, 42, -10)
- float: числа с плавающей точкой (3.14, -0.5)
- str: строки ("Hello", 'Python')
- bool: логические значения (True, False)

Примеры:
name = "Иван"
age = 25
is_student = True
height = 1.75

Операции с переменными:
- Арифметические: +, -, *, /, //, %, **
- Строковые: конкатенация (+), повторение (*)
- Сравнение: ==, !=, <, >, <=, >=

Практикуйтесь создавать переменные и работать с ними!""",
                order=2,
                duration_minutes=45
            ),
            models.Lesson(
                course_id=course1.id,
                title="Условные операторы",
                content="""Условные операторы в Python

Условные операторы позволяют выполнять разный код в зависимости от условий.

Синтаксис if-elif-else:

if условие1:
    # код, если условие1 истинно
elif условие2:
    # код, если условие2 истинно
else:
    # код, если все условия ложны

Пример:
age = 18
if age >= 18:
    print("Вы совершеннолетний")
else:
    print("Вы несовершеннолетний")

Логические операторы:
- and: оба условия должны быть истинны
- or: хотя бы одно условие должно быть истинным
- not: инвертирует значение

Вложенные условия также возможны для более сложной логики.""",
                order=3,
                duration_minutes=40
            )
        ]
        
        # Уроки для курса ML
        lessons_ml = [
            models.Lesson(
                course_id=course2.id,
                title="Что такое машинное обучение?",
                content="""Введение в машинное обучение

Машинное обучение (ML) - это область искусственного интеллекта, которая позволяет компьютерам учиться на данных без явного программирования.

Типы машинного обучения:

1. Обучение с учителем (Supervised Learning)
   - Классификация
   - Регрессия
   
2. Обучение без учителя (Unsupervised Learning)
   - Кластеризация
   - Снижение размерности
   
3. Обучение с подкреплением (Reinforcement Learning)
   - Агенты
   - Награды и наказания

Применение ML:
- Рекомендательные системы
- Распознавание изображений
- Обработка естественного языка
- Прогнозирование
- Автономные системы""",
                order=1,
                duration_minutes=50
            ),
            models.Lesson(
                course_id=course2.id,
                title="Подготовка данных",
                content="""Подготовка данных для ML

Качество данных критически важно для успеха модели ML.

Этапы подготовки данных:

1. Сбор данных
   - Определение источников
   - Извлечение данных

2. Очистка данных
   - Обработка пропущенных значений
   - Удаление дубликатов
   - Исправление ошибок

3. Преобразование данных
   - Нормализация
   - Стандартизация
   - Кодирование категориальных признаков

4. Разделение данных
   - Обучающая выборка (train)
   - Валидационная выборка (validation)
   - Тестовая выборка (test)

Библиотеки Python для работы с данными:
- pandas: работа с табличными данными
- numpy: численные вычисления
- scikit-learn: инструменты ML""",
                order=2,
                duration_minutes=60
            )
        ]
        
        # Уроки для курса React
        lessons_react = [
            models.Lesson(
                course_id=course3.id,
                title="Введение в React",
                content="""React - библиотека для создания пользовательских интерфейсов

React разработан Facebook и является одним из самых популярных инструментов для фронтенд разработки.

Ключевые концепции React:

1. Компоненты
   - Переиспользуемые части UI
   - Функциональные и классовые компоненты

2. JSX
   - Синтаксис, похожий на HTML
   - Встраивание JavaScript выражений

3. Виртуальный DOM
   - Эффективное обновление UI
   - Минимизация операций с реальным DOM

4. Однонаправленный поток данных
   - Props для передачи данных вниз
   - Предсказуемость приложения

Почему React?
- Производительность
- Большое сообщество
- Богатая экосистема
- Поддержка мобильной разработки (React Native)""",
                order=1,
                duration_minutes=40
            ),
            models.Lesson(
                course_id=course3.id,
                title="Компоненты и Props",
                content="""Компоненты и Props в React

Компоненты - строительные блоки React приложений.

Функциональные компоненты:

function Welcome(props) {
  return <h1>Привет, {props.name}!</h1>;
}

Props (свойства):
- Передача данных от родителя к ребенку
- Только для чтения
- Могут быть любого типа

Пример использования:

function App() {
  return (
    <div>
      <Welcome name="Анна" />
      <Welcome name="Борис" />
    </div>
  );
}

Композиция компонентов:
- Вложенные компоненты
- Переиспользование логики
- Создание сложных UI из простых частей

Лучшие практики:
- Один компонент = одна ответственность
- Описательные имена
- Деструктуризация props""",
                order=2,
                duration_minutes=50
            )
        ]
        
        all_lessons = lessons_python + lessons_ml + lessons_react
        db.add_all(all_lessons)
        db.commit()
        
        print(f"✅ Создано {len(all_lessons)} уроков")
        
        print("\n✨ Инициализация базы данных завершена!")
        print("\n🚀 Теперь вы можете:")
        print("   1. Запустить сервер: python main.py")
        print("   2. Открыть http://localhost:8000/docs")
        print("   3. Войти с тестовыми учетными данными")
        
except Exception as e:
    print(f"❌ Ошибка при инициализации: {e}")
    db.rollback()
finally:
    db.close()


