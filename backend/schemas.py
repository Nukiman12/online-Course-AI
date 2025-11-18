from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: str
    role: Optional[str] = "student"

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class User(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

# Course Schemas
class LessonBase(BaseModel):
    title: str
    content: str
    video_url: Optional[str] = None
    order: int
    duration_minutes: Optional[int] = None

class LessonCreate(LessonBase):
    course_id: int

class Lesson(LessonBase):
    id: int
    course_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class CourseBase(BaseModel):
    title: str
    description: str
    category: str
    level: str
    image_url: Optional[str] = None

class CourseCreate(CourseBase):
    pass

class Course(CourseBase):
    id: int
    instructor_id: int
    created_at: datetime
    lessons: List[Lesson] = []
    
    class Config:
        from_attributes = True

# Enrollment Schema
class EnrollmentCreate(BaseModel):
    course_id: int

class Enrollment(BaseModel):
    id: int
    user_id: int
    course_id: int
    enrolled_at: datetime
    progress: float
    completed: bool
    course: Course
    
    class Config:
        from_attributes = True

# AI Chat Schemas
class ChatRequest(BaseModel):
    message: str
    course_id: Optional[int] = None
    message_type: str  # help, hint, summary, material_search

class ChatResponse(BaseModel):
    response: str
    message_id: int

# Material Schemas
class MaterialCreate(BaseModel):
    course_id: int
    title: str
    material_type: str

class Material(BaseModel):
    id: int
    course_id: int
    title: str
    content: str
    material_type: str
    generated_by_ai: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Assignment Schemas
class AssignmentCreate(BaseModel):
    lesson_id: int
    title: str
    description: str
    due_date: Optional[datetime] = None

class AssignmentSubmit(BaseModel):
    submission: str

class Assignment(BaseModel):
    id: int
    lesson_id: int
    student_id: int
    title: str
    description: str
    submission: Optional[str]
    grade: Optional[float]
    ai_feedback: Optional[str]
    status: str
    due_date: Optional[datetime]
    submitted_at: Optional[datetime]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Schedule Schemas
class ScheduleCreate(BaseModel):
    course_id: int
    lesson_id: Optional[int] = None
    title: str
    description: Optional[str] = None
    scheduled_time: datetime
    duration_minutes: int

class Schedule(BaseModel):
    id: int
    user_id: int
    course_id: int
    lesson_id: Optional[int]
    title: str
    description: Optional[str]
    scheduled_time: datetime
    duration_minutes: int
    completed: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# AI Generation Schemas
class GenerateMaterialRequest(BaseModel):
    course_id: int
    lesson_ids: List[int]
    material_type: str  # summary, notes, practice

class GenerateScheduleRequest(BaseModel):
    course_id: int
    preferences: dict  # days_per_week, duration, start_date


