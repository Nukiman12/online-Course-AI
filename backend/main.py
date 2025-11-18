from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta

import models
import schemas
from database import engine, get_db
from auth import get_password_hash, verify_password, create_access_token, get_current_user, get_current_teacher
from ai_service import AIService

# Создание таблиц
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="EduAI - AI-powered Learning Platform")

# CORS настройки
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===================== AUTH ENDPOINTS =====================

@app.post("/api/auth/register", response_model=schemas.Token)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Проверка существования пользователя
    db_user = db.query(models.User).filter(
        (models.User.email == user.email) | (models.User.username == user.username)
    ).first()
    
    if db_user:
        raise HTTPException(status_code=400, detail="Email или username уже зарегистрированы")
    
    # Создание пользователя
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        username=user.username,
        full_name=user.full_name,
        hashed_password=hashed_password,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Создание токена
    access_token = create_access_token(data={"sub": str(db_user.id)})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": db_user
    }

@app.post("/api/auth/login", response_model=schemas.Token)
def login(user_credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == user_credentials.username).first()
    
    if not user or not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверные учетные данные"
        )
    
    access_token = create_access_token(data={"sub": str(user.id)})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@app.get("/api/auth/me", response_model=schemas.User)
def get_me(current_user: models.User = Depends(get_current_user)):
    return current_user

# ===================== COURSE ENDPOINTS =====================

@app.get("/api/courses", response_model=List[schemas.Course])
def get_courses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    courses = db.query(models.Course).offset(skip).limit(limit).all()
    return courses

@app.get("/api/courses/{course_id}", response_model=schemas.Course)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Курс не найден")
    return course

@app.post("/api/courses", response_model=schemas.Course)
def create_course(
    course: schemas.CourseCreate,
    current_user: models.User = Depends(get_current_teacher),
    db: Session = Depends(get_db)
):
    db_course = models.Course(
        **course.dict(),
        instructor_id=current_user.id
    )
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@app.put("/api/courses/{course_id}", response_model=schemas.Course)
def update_course(
    course_id: int,
    course_update: schemas.CourseCreate,
    current_user: models.User = Depends(get_current_teacher),
    db: Session = Depends(get_db)
):
    db_course = db.query(models.Course).filter(models.Course.id == course_id).first()
    
    if not db_course:
        raise HTTPException(status_code=404, detail="Курс не найден")
    
    if db_course.instructor_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Недостаточно прав")
    
    for key, value in course_update.dict().items():
        setattr(db_course, key, value)
    
    db.commit()
    db.refresh(db_course)
    return db_course

@app.delete("/api/courses/{course_id}")
def delete_course(
    course_id: int,
    current_user: models.User = Depends(get_current_teacher),
    db: Session = Depends(get_db)
):
    db_course = db.query(models.Course).filter(models.Course.id == course_id).first()
    
    if not db_course:
        raise HTTPException(status_code=404, detail="Курс не найден")
    
    if db_course.instructor_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Недостаточно прав")
    
    db.delete(db_course)
    db.commit()
    return {"message": "Курс удален"}

# ===================== LESSON ENDPOINTS =====================

@app.get("/api/courses/{course_id}/lessons", response_model=List[schemas.Lesson])
def get_lessons(course_id: int, db: Session = Depends(get_db)):
    lessons = db.query(models.Lesson).filter(
        models.Lesson.course_id == course_id
    ).order_by(models.Lesson.order).all()
    return lessons

@app.post("/api/lessons", response_model=schemas.Lesson)
def create_lesson(
    lesson: schemas.LessonCreate,
    current_user: models.User = Depends(get_current_teacher),
    db: Session = Depends(get_db)
):
    # Проверка прав
    course = db.query(models.Course).filter(models.Course.id == lesson.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Курс не найден")
    
    if course.instructor_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Недостаточно прав")
    
    db_lesson = models.Lesson(**lesson.dict())
    db.add(db_lesson)
    db.commit()
    db.refresh(db_lesson)
    return db_lesson

@app.put("/api/lessons/{lesson_id}", response_model=schemas.Lesson)
def update_lesson(
    lesson_id: int,
    lesson_update: schemas.LessonCreate,
    current_user: models.User = Depends(get_current_teacher),
    db: Session = Depends(get_db)
):
    db_lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    
    if not db_lesson:
        raise HTTPException(status_code=404, detail="Урок не найден")
    
    course = db.query(models.Course).filter(models.Course.id == db_lesson.course_id).first()
    if course.instructor_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Недостаточно прав")
    
    for key, value in lesson_update.dict().items():
        setattr(db_lesson, key, value)
    
    db.commit()
    db.refresh(db_lesson)
    return db_lesson

@app.delete("/api/lessons/{lesson_id}")
def delete_lesson(
    lesson_id: int,
    current_user: models.User = Depends(get_current_teacher),
    db: Session = Depends(get_db)
):
    db_lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    
    if not db_lesson:
        raise HTTPException(status_code=404, detail="Урок не найден")
    
    course = db.query(models.Course).filter(models.Course.id == db_lesson.course_id).first()
    if course.instructor_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Недостаточно прав")
    
    db.delete(db_lesson)
    db.commit()
    return {"message": "Урок удален"}

# ===================== ENROLLMENT ENDPOINTS =====================

@app.post("/api/enrollments", response_model=schemas.Enrollment)
def enroll_course(
    enrollment: schemas.EnrollmentCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Проверка существования курса
    course = db.query(models.Course).filter(models.Course.id == enrollment.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Курс не найден")
    
    # Проверка уже записан ли пользователь
    existing = db.query(models.Enrollment).filter(
        models.Enrollment.user_id == current_user.id,
        models.Enrollment.course_id == enrollment.course_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Вы уже записаны на этот курс")
    
    db_enrollment = models.Enrollment(
        user_id=current_user.id,
        course_id=enrollment.course_id
    )
    db.add(db_enrollment)
    db.commit()
    db.refresh(db_enrollment)
    return db_enrollment

@app.get("/api/my-enrollments", response_model=List[schemas.Enrollment])
def get_my_enrollments(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    enrollments = db.query(models.Enrollment).filter(
        models.Enrollment.user_id == current_user.id
    ).all()
    return enrollments

# ===================== AI CHAT ENDPOINTS =====================

@app.post("/api/ai/chat", response_model=schemas.ChatResponse)
async def ai_chat(
    chat_request: schemas.ChatRequest,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Получение контекста курса если указан
    context = ""
    if chat_request.course_id:
        course = db.query(models.Course).filter(models.Course.id == chat_request.course_id).first()
        if course:
            context = f"Курс: {course.title}\nОписание: {course.description}"
    
    # Получение ответа от AI
    ai_response = await AIService.get_ai_response(
        chat_request.message,
        context,
        chat_request.message_type
    )
    
    # Сохранение в базу
    chat_message = models.ChatMessage(
        user_id=current_user.id,
        course_id=chat_request.course_id,
        message=chat_request.message,
        response=ai_response,
        message_type=chat_request.message_type
    )
    db.add(chat_message)
    db.commit()
    db.refresh(chat_message)
    
    return {
        "response": ai_response,
        "message_id": chat_message.id
    }

@app.get("/api/ai/chat-history")
def get_chat_history(
    course_id: int = None,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(models.ChatMessage).filter(models.ChatMessage.user_id == current_user.id)
    
    if course_id:
        query = query.filter(models.ChatMessage.course_id == course_id)
    
    messages = query.order_by(models.ChatMessage.created_at.desc()).limit(50).all()
    return messages

# ===================== AI MATERIAL GENERATION =====================

@app.post("/api/ai/generate-summary", response_model=schemas.Material)
async def generate_summary(
    request: schemas.MaterialCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Получение уроков курса
    lessons = db.query(models.Lesson).filter(
        models.Lesson.course_id == request.course_id
    ).order_by(models.Lesson.order).all()
    
    if not lessons:
        raise HTTPException(status_code=404, detail="Уроки не найдены")
    
    lessons_data = [{"title": l.title, "content": l.content} for l in lessons]
    
    # Генерация конспекта
    summary_content = await AIService.generate_course_summary(lessons_data)
    
    # Сохранение материала
    material = models.CourseMaterial(
        course_id=request.course_id,
        title=request.title,
        content=summary_content,
        material_type=request.material_type,
        generated_by_ai=True
    )
    db.add(material)
    db.commit()
    db.refresh(material)
    
    return material

@app.post("/api/ai/generate-practice", response_model=schemas.Material)
async def generate_practice(
    lesson_id: int,
    difficulty: str = "medium",
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    
    if not lesson:
        raise HTTPException(status_code=404, detail="Урок не найден")
    
    # Генерация практических материалов
    practice_content = await AIService.generate_practice_materials(lesson.content, difficulty)
    
    # Сохранение материала
    material = models.CourseMaterial(
        course_id=lesson.course_id,
        title=f"Практические задания: {lesson.title}",
        content=practice_content,
        material_type="practice",
        generated_by_ai=True
    )
    db.add(material)
    db.commit()
    db.refresh(material)
    
    return material

@app.get("/api/courses/{course_id}/materials", response_model=List[schemas.Material])
def get_course_materials(
    course_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    materials = db.query(models.CourseMaterial).filter(
        models.CourseMaterial.course_id == course_id
    ).order_by(models.CourseMaterial.created_at.desc()).all()
    return materials

# ===================== ASSIGNMENT ENDPOINTS =====================

@app.post("/api/assignments", response_model=schemas.Assignment)
def create_assignment(
    assignment: schemas.AssignmentCreate,
    current_user: models.User = Depends(get_current_teacher),
    db: Session = Depends(get_db)
):
    db_assignment = models.Assignment(
        **assignment.dict(),
        student_id=current_user.id
    )
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment

@app.post("/api/assignments/{assignment_id}/submit")
async def submit_assignment(
    assignment_id: int,
    submission: schemas.AssignmentSubmit,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    assignment = db.query(models.Assignment).filter(
        models.Assignment.id == assignment_id,
        models.Assignment.student_id == current_user.id
    ).first()
    
    if not assignment:
        raise HTTPException(status_code=404, detail="Задание не найдено")
    
    # AI проверка
    check_result = await AIService.check_assignment(assignment.description, submission.submission)
    
    assignment.submission = submission.submission
    assignment.grade = check_result["total_score"]
    assignment.ai_feedback = f"{check_result['feedback']}\n\nРекомендации: {check_result['suggestions']}"
    assignment.status = "submitted"
    assignment.submitted_at = datetime.utcnow()
    
    db.commit()
    db.refresh(assignment)
    
    return assignment

@app.get("/api/my-assignments", response_model=List[schemas.Assignment])
def get_my_assignments(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    assignments = db.query(models.Assignment).filter(
        models.Assignment.student_id == current_user.id
    ).order_by(models.Assignment.created_at.desc()).all()
    return assignments

# ===================== SCHEDULE ENDPOINTS =====================

@app.post("/api/schedules", response_model=schemas.Schedule)
def create_schedule(
    schedule: schemas.ScheduleCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_schedule = models.Schedule(
        **schedule.dict(),
        user_id=current_user.id
    )
    db.add(db_schedule)
    db.commit()
    db.refresh(db_schedule)
    return db_schedule

@app.post("/api/ai/generate-schedule")
async def generate_schedule(
    request: schemas.GenerateScheduleRequest,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Получение информации о курсе
    course = db.query(models.Course).filter(models.Course.id == request.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Курс не найден")
    
    lessons = db.query(models.Lesson).filter(models.Lesson.course_id == request.course_id).all()
    
    course_info = {
        "title": course.title,
        "lesson_count": len(lessons),
        "total_duration": sum([l.duration_minutes or 60 for l in lessons])
    }
    
    # Генерация расписания
    schedule_data = await AIService.generate_learning_schedule(course_info, request.preferences)
    
    # Сохранение расписания (упрощенная версия)
    schedules = []
    start_date = datetime.fromisoformat(request.preferences.get('start_date', datetime.now().isoformat()))
    
    for idx, item in enumerate(schedule_data):
        if 'error' not in item:
            schedule = models.Schedule(
                user_id=current_user.id,
                course_id=request.course_id,
                title=item.get('focus', f"Занятие {idx+1}"),
                description=str(item.get('lessons', [])),
                scheduled_time=start_date + timedelta(days=idx),
                duration_minutes=item.get('duration', 60)
            )
            db.add(schedule)
            schedules.append(schedule)
    
    db.commit()
    return {"message": "Расписание создано", "count": len(schedules)}

@app.get("/api/my-schedule", response_model=List[schemas.Schedule])
def get_my_schedule(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    schedules = db.query(models.Schedule).filter(
        models.Schedule.user_id == current_user.id
    ).order_by(models.Schedule.scheduled_time).all()
    return schedules

# ===================== RESOURCES ENDPOINT =====================

@app.get("/api/ai/resources")
async def get_resources(
    topic: str,
    level: str = "beginner",
    current_user: models.User = Depends(get_current_user)
):
    resources = await AIService.suggest_resources(topic, level)
    return {"resources": resources}

# ===================== ROOT =====================

@app.get("/")
def root():
    return {
        "message": "EduAI API - AI-powered Learning Platform",
        "version": "1.0.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


