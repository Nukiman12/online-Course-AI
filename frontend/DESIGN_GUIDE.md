# 🎨 Руководство по дизайну EduAI

## Философия дизайна

**EduAI** использует **аристократический черно-белый дизайн**, вдохновленный классической элегантностью и современным минимализмом.

### Ключевые принципы:
- ⚫ **Монохромная палитра** - Черный, белый и оттенки серого
- 👑 **Аристократичность** - Утонченность и премиальность
- 📐 **Геометрия** - Четкие линии, строгие формы
- ✨ **Минимализм** - Чистота и функциональность
- 🎯 **Контраст** - Выразительность через контраст

---

## Цветовая палитра

### Основные цвета
```css
--primary: #000000          /* Черный */
--primary-light: #1a1a1a    /* Темно-серый */
--accent: #ffffff           /* Белый */
```

### Текст
```css
--text-primary: #000000     /* Основной текст */
--text-secondary: #333333   /* Вторичный текст */
--text-muted: #666666       /* Приглушенный текст */
--text-light: #ffffff       /* Светлый текст */
```

### Фон
```css
--bg-primary: #ffffff       /* Белый фон */
--bg-secondary: #fafafa     /* Светло-серый */
--bg-tertiary: #f0f0f0      /* Серый */
--bg-dark: #000000          /* Черный фон */
```

### Границы
```css
--border-color: #e0e0e0     /* Светлая граница */
--border-dark: #333333      /* Темная граница */
```

---

## Типографика

### Шрифты

**Заголовки:**
```css
font-family: 'Playfair Display', serif;
font-weight: 700-900;
letter-spacing: -2px;
```

**Основной текст:**
```css
font-family: 'Inter', sans-serif;
font-weight: 400-600;
```

**Акценты:**
```css
text-transform: uppercase;
letter-spacing: 2px;
font-weight: 600-700;
```

### Размеры

| Элемент | Размер | Использование |
|---------|--------|---------------|
| Hero H1 | 82px | Главный заголовок |
| H1 | 48-56px | Заголовки страниц |
| H2 | 32-42px | Секции |
| H3 | 26-32px | Подсекции |
| Body | 16px | Основной текст |
| Small | 14px | Вторичный текст |
| Tiny | 12-13px | Метки, badges |

---

## Компоненты

### Кнопки

**Primary Button (Черная):**
```css
background: #000000;
color: white;
border: 2px solid #000000;
text-transform: uppercase;
letter-spacing: 0.5px;
```

**Secondary Button (Белая с обводкой):**
```css
background: white;
color: #000000;
border: 2px solid #000000;
/* При hover превращается в black */
```

### Карточки (Cards)

**Базовая карточка:**
```css
background: white;
border: 2px-3px solid #e0e0e0;
border-radius: 12-16px;
box-shadow: 0 4px 16px rgba(0,0,0,0.08);

/* При hover */
border-color: #000000;
box-shadow: 12px 12px 0 #000000; /* Жесткая тень */
transform: translate(-4px, -4px);
```

### Инпуты

```css
border: 2px solid #e0e0e0;
border-radius: 10-12px;
padding: 16px 20px;

/* При focus */
border-color: #000000;
box-shadow: 0 0 0 4px rgba(0,0,0,0.05);
```

### Badges

```css
background: #000000;
color: white;
border: 1px solid #000000;
border-radius: 999px;
padding: 8px 16px;
font-size: 12px;
font-weight: 700;
letter-spacing: 1px;
text-transform: uppercase;
```

---

## Эффекты и тени

### Тени

```css
/* Мягкая тень */
--shadow-md: 0 4px 16px rgba(0,0,0,0.08);

/* Жесткая тень (Aristocratic) */
box-shadow: 8px 8px 0 #000000;
box-shadow: 12px 12px 0 #000000; /* Hover */
```

### Анимации

**Появление (Fade In):**
```css
animation: fadeIn 0.8s ease-out;
```

**Масштабирование (Scale In):**
```css
animation: scaleIn 0.5s ease-out;
```

**Слайд (Slide In):**
```css
animation: slideIn 0.5s ease-out;
```

**Плавание (Float):**
```css
animation: float 6s ease-in-out infinite;
```

### Переходы

```css
--transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Особенности дизайна

### 1. Декоративная линия
```jsx
<div className="decorative-line" />
```
Используется для разделения секций, создания визуальных пауз.

### 2. Аристократический Badge
```jsx
<div className="aristocratic-badge">
  Premium
</div>
```
С жесткой тенью и uppercase текстом.

### 3. Видео фон
- Применяется **grayscale(100%)** и **brightness(0.4)**
- Добавляется градиентный оверлей для читаемости
- Автоматическое воспроизведение, зацикливание, без звука

### 4. Жесткие тени (Hard Shadows)
Вместо мягких теней используются жесткие геометрические тени:
```css
box-shadow: 8px 8px 0 #000000;
```

### 5. Hover эффекты
При наведении:
- Границы становятся черными
- Появляются жесткие тени
- Элементы слегка сдвигаются (translate)

---

## Layout структура

### Header
- Липкий (sticky) хедер
- Белый фон с черной нижней границей (3px)
- Логотип с жесткой тенью
- Навигация с uppercase текстом

### Hero секция
- Полноэкранная высота (min-height: 85vh)
- Видео фон с оверлеем
- Крупный заголовок (82px)
- Декоративные элементы (корона, линии)

### Content секции
- Белый фон
- Просторные отступы (100px между секциями)
- Сетка с автоподстройкой (grid-2, grid-3, grid-4)

### Footer
- Белый фон
- Черная верхняя граница (3px)
- Трехколоночная сетка с информацией

---

## Responsive дизайн

### Breakpoints
```css
@media (max-width: 768px) {
  /* Мобильные устройства */
  - Одна колонка в сетках
  - Уменьшенные отступы
  - Меньшие размеры шрифтов
  - Мобильное меню
}
```

### Мобильное меню
- Гамбургер меню (черная иконка)
- Белый фон с черными границами
- Анимация slideIn

---

## Иконки

Используются **Lucide React** иконки:
- Crown (👑) - Премиум, аристократичность
- Brain (🧠) - AI, интеллект
- Sparkles (✨) - Инновации, особенности
- BookOpen (📖) - Образование
- Users (👥) - Сообщество
- Award (🏆) - Достижения

---

## Лучшие практики

### DO ✅
- Использовать жесткие геометрические формы
- Применять жесткие тени для акцентов
- Использовать uppercase для меток и кнопок
- Добавлять анимации для плавности
- Поддерживать высокий контраст

### DON'T ❌
- Не использовать цвета (кроме черного/белого/серого)
- Не делать мягкие скругления (max 16px)
- Не использовать градиенты (только для фона)
- Не перегружать анимациями
- Не использовать мелкий текст без uppercase

---

## Примеры использования

### Создание карточки
```jsx
<div className="card" style={{
  border: '2px solid #e0e0e0',
  transition: 'all 0.4s'
}}
onMouseEnter={(e) => {
  e.currentTarget.style.borderColor = '#000000'
  e.currentTarget.style.boxShadow = '12px 12px 0 #000000'
  e.currentTarget.style.transform = 'translate(-4px, -4px)'
}}
onMouseLeave={(e) => {
  e.currentTarget.style.borderColor = '#e0e0e0'
  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
  e.currentTarget.style.transform = 'translate(0, 0)'
}}>
  {/* Контент */}
</div>
```

### Создание заголовка секции
```jsx
<h2 style={{
  fontSize: '56px',
  fontWeight: 900,
  color: '#000000',
  letterSpacing: '-2px',
  fontFamily: "'Playfair Display', serif",
  textAlign: 'center'
}}>
  Заголовок секции
</h2>
<div className="decorative-line" />
```

---

## Вдохновение

Дизайн вдохновлен:
- 📰 Классическими газетами и журналами
- 👔 Премиум брендами (Chanel, Dior, Armani)
- 🏛️ Архитектурным минимализмом
- 📱 Современными premium приложениями
- 🎨 Swiss Style / International Typographic Style

---

## Поддержка

Для изменения дизайна редактируйте:
- `frontend/src/index.css` - Глобальные стили
- `frontend/src/pages/*.tsx` - Стили страниц
- `frontend/src/components/Layout.tsx` - Навигация и футер

---

**Создано с ❤️ для EduAI Premium Education**

