# 📹 Настройка видео для главной страницы

## Вариант 1: Использование локального видео (рекомендуется)

### Шаг 1: Подготовка видео
1. Найдите или создайте видео для фона (рекомендуется: 1920x1080, формат MP4)
2. **Рекомендуемые темы видео:**
   - Студенты за работой в библиотеке
   - Люди с ноутбуками/планшетами
   - Абстрактные образовательные сцены
   - Минималистичные черно-белые сцены

### Шаг 2: Размещение видео
1. Создайте папку `public/videos` в корне проекта frontend:
   ```bash
   mkdir frontend/public/videos
   ```

2. Скопируйте ваше видео в эту папку, например:
   ```
   frontend/public/videos/hero-background.mp4
   ```

### Шаг 3: Обновление пути в коде
Откройте `frontend/src/pages/Home.tsx` и измените строку 134:

```typescript
<source src="/videos/hero-background.mp4" type="video/mp4" />
```

## Вариант 2: Использование внешнего видео

### Бесплатные источники видео:

1. **Mixkit** - https://mixkit.co/free-stock-video/
2. **Pexels Videos** - https://www.pexels.com/videos/
3. **Pixabay** - https://pixabay.com/videos/

### Рекомендуемые поисковые запросы:
- "student studying"
- "people working laptop"
- "business professional"
- "education technology"
- "minimal workspace"

### Использование внешнего видео:
В файле `frontend/src/pages/Home.tsx` (строка 134) замените URL:

```typescript
<source src="https://YOUR_VIDEO_URL.mp4" type="video/mp4" />
```

## Текущее видео

По умолчанию используется видео с Mixkit:
```
https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-person-working-on-a-laptop-in-a-4834-large.mp4
```

## Оптимизация видео

### Для лучшей производительности:
1. **Размер файла:** Максимум 10-15 МБ
2. **Разрешение:** 1920x1080 или 1280x720
3. **Длительность:** 10-30 секунд (видео будет зациклено)
4. **Формат:** MP4 (H.264 кодек)

### Инструменты для оптимизации:
- **HandBrake** - https://handbrake.fr/
- **FFmpeg** (командная строка):
  ```bash
  ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset fast output.mp4
  ```

## Стилизация видео

Видео автоматически применяет фильтры:
- **Grayscale (100%)** - Черно-белый эффект
- **Brightness (40%)** - Затемнение для читаемости текста
- **Overlay gradient** - Дополнительный градиент для контраста

### Изменение фильтров

В `frontend/src/index.css` (строки 636-648) можно настроить:

```css
.video-background video {
  filter: grayscale(100%) brightness(0.4);
  /* Изменить на: */
  /* filter: grayscale(80%) brightness(0.5); - менее черно-белый */
  /* filter: grayscale(100%) brightness(0.3); - темнее */
}
```

## Резервные варианты

Если видео не загружается:
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что путь к файлу правильный
3. Проверьте формат видео (должен быть MP4)
4. Попробуйте другой источник видео

## Отключение видео

Чтобы отключить видео и использовать статичный фон:

В `frontend/src/pages/Home.tsx` (строка 127-145) закомментируйте блок:

```typescript
{/* <div className="video-background">
  <video autoPlay loop muted playsInline>
    <source src="..." type="video/mp4" />
  </video>
</div> */}
```

И измените стиль контейнера (строка 118):

```typescript
background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)'
```

---

💡 **Совет:** Для аристократического дизайна выбирайте минималистичные, элегантные видео с нейтральными цветами.

