import openai
import os
from dotenv import load_dotenv
from typing import List, Dict
import json

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
MODEL_NAME = os.getenv("OPENAI_MODEL", "gpt-4o-mini")


class AIService:
    
    @staticmethod
    async def get_ai_response(message: str, context: str = "", message_type: str = "help") -> str:
        """Получить ответ от AI помощника"""
        
        system_prompts = {
            "help": "Ты - AI помощник для образовательной платформы. Помогай студентам находить материалы, отвечай на вопросы по курсам, предлагай дополнительные ресурсы. Отвечай кратко и понятно.",
            "hint": "Ты - AI помощник, который дает подсказки студентам. Не давай прямых ответов, а направляй мышление студента в правильном направлении. Задавай наводящие вопросы.",
            "summary": "Ты - AI помощник, который создает краткие конспекты учебных материалов. Создавай структурированные конспекты с ключевыми моментами.",
            "material_search": "Ты - AI помощник, который помогает находить релевантные материалы по курсу. Анализируй запрос и предлагай конкретные темы и разделы."
        }
        
        system_prompt = system_prompts.get(message_type, system_prompts["help"])
        
        try:
            messages = [
                {"role": "system", "content": system_prompt}
            ]
            
            if context:
                messages.append({"role": "system", "content": f"Контекст курса: {context}"})
            
            messages.append({"role": "user", "content": message})
            
            response = openai.chat.completions.create(
                model=MODEL_NAME,
                messages=messages,
                temperature=0.7,
                max_tokens=1000
            )
            
            return response.choices[0].message.content
        except Exception as e:
            return f"Ошибка при обращении к AI: {str(e)}. Пожалуйста, проверьте настройки API ключа."
    
    @staticmethod
    async def generate_course_summary(lessons: List[Dict]) -> str:
        """Генерировать конспект курса"""
        
        lessons_text = "\n\n".join([
            f"Урок {i+1}: {lesson['title']}\n{lesson['content'][:500]}..."
            for i, lesson in enumerate(lessons)
        ])
        
        prompt = f"""На основе следующих уроков создай подробный конспект курса:

{lessons_text}

Конспект должен включать:
1. Основные темы и концепции
2. Ключевые моменты каждого урока
3. Важные определения и термины
4. Практические выводы

Структурируй конспект с заголовками и списками."""
        
        try:
            response = openai.chat.completions.create(
                model=MODEL_NAME,
                messages=[
                    {"role": "system", "content": "Ты - эксперт по созданию образовательных конспектов. Создавай структурированные и понятные конспекты."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.5,
                max_tokens=2000
            )
            
            return response.choices[0].message.content
        except Exception as e:
            return f"Ошибка при генерации конспекта: {str(e)}"
    
    @staticmethod
    async def generate_practice_materials(lesson_content: str, difficulty: str = "medium") -> str:
        """Генерировать практические материалы"""
        
        difficulty_map = {
            "easy": "базового уровня",
            "medium": "среднего уровня",
            "hard": "продвинутого уровня"
        }
        
        prompt = f"""На основе следующего учебного материала создай практические задания {difficulty_map[difficulty]}:

{lesson_content}

Создай:
1. 5 вопросов для самопроверки
2. 3 практических задания
3. 2 задачи для размышления

Формат ответа должен быть структурированным."""
        
        try:
            response = openai.chat.completions.create(
                model=MODEL_NAME,
                messages=[
                    {"role": "system", "content": "Ты - эксперт по созданию образовательных заданий. Создавай разнообразные и полезные практические материалы."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=1500
            )
            
            return response.choices[0].message.content
        except Exception as e:
            return f"Ошибка при генерации практических материалов: {str(e)}"
    
    @staticmethod
    async def check_assignment(assignment_description: str, submission: str) -> Dict:
        """Проверить задание студента"""
        
        prompt = f"""Проверь задание студента и дай обратную связь.

Описание задания:
{assignment_description}

Ответ студента:
{submission}

Оцени работу по критериям:
1. Полнота ответа (0-25 баллов)
2. Правильность (0-25 баллов)
3. Понимание темы (0-25 баллов)
4. Качество оформления (0-25 баллов)

Верни результат в формате JSON:
{{
    "total_score": <сумма баллов>,
    "criteria_scores": {{
        "completeness": <баллы>,
        "correctness": <баллы>,
        "understanding": <баллы>,
        "quality": <баллы>
    }},
    "feedback": "<детальная обратная связь>",
    "suggestions": "<рекомендации по улучшению>"
}}"""
        
        try:
            response = openai.chat.completions.create(
                model=MODEL_NAME,
                messages=[
                    {"role": "system", "content": "Ты - AI ассистент преподавателя. Проверяй работы студентов объективно и давай конструктивную обратную связь."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_tokens=1000,
                response_format={"type": "json_object"}
            )
            
            result = json.loads(response.choices[0].message.content)
            return result
        except Exception as e:
            return {
                "total_score": 0,
                "criteria_scores": {},
                "feedback": f"Ошибка при проверке: {str(e)}",
                "suggestions": "Пожалуйста, попробуйте еще раз."
            }
    
    @staticmethod
    async def generate_learning_schedule(course_info: Dict, preferences: Dict) -> List[Dict]:
        """Генерировать расписание обучения"""
        
        prompt = f"""Создай оптимальное расписание обучения для курса.

Информация о курсе:
- Название: {course_info['title']}
- Количество уроков: {course_info['lesson_count']}
- Общая длительность: {course_info['total_duration']} минут

Предпочтения студента:
- Дней в неделю: {preferences.get('days_per_week', 3)}
- Продолжительность занятия: {preferences.get('session_duration', 60)} минут
- Начало обучения: {preferences.get('start_date', 'сегодня')}

Создай расписание в формате JSON:
{{
    "schedule": [
        {{
            "day": <день недели>,
            "lessons": [<список уроков>],
            "duration": <длительность в минутах>,
            "focus": "<основной фокус дня>"
        }}
    ],
    "total_weeks": <количество недель>,
    "recommendations": "<рекомендации по обучению>"
}}"""
        
        try:
            response = openai.chat.completions.create(
                model=MODEL_NAME,
                messages=[
                    {"role": "system", "content": "Ты - эксперт по планированию обучения. Создавай эффективные расписания с учетом педагогических принципов."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.5,
                max_tokens=1500,
                response_format={"type": "json_object"}
            )
            
            result = json.loads(response.choices[0].message.content)
            return result['schedule']
        except Exception as e:
            return [{
                "error": f"Ошибка при генерации расписания: {str(e)}"
            }]
    
    @staticmethod
    async def suggest_resources(topic: str, level: str) -> List[str]:
        """Предложить дополнительные ресурсы"""
        
        prompt = f"""Предложи дополнительные образовательные ресурсы по теме "{topic}" для уровня "{level}".

Включи:
1. Рекомендуемые книги
2. Онлайн курсы и видео
3. Статьи и туториалы
4. Практические проекты

Формат: список с кратким описанием каждого ресурса."""
        
        try:
            response = openai.chat.completions.create(
                model=MODEL_NAME,
                messages=[
                    {"role": "system", "content": "Ты - эксперт по образовательным ресурсам. Рекомендуй качественные и актуальные материалы."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.6,
                max_tokens=1000
            )
            
            content = response.choices[0].message.content
            # Разделяем на список
            resources = [r.strip() for r in content.split('\n') if r.strip() and not r.strip().startswith('#')]
            return resources
        except Exception as e:
            return [f"Ошибка при поиске ресурсов: {str(e)}"]

