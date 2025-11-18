from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    role = Column(String, default="student")  # student, teacher, admin
    created_at = Column(DateTime, default=datetime.utcnow)
    
    enrollments = relationship("Enrollment", back_populates="user")
    messages = relationship("ChatMessage", back_populates="user")
    assignments = relationship("Assignment", back_populates="student")

class Course(Base):
    __tablename__ = "courses"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    instructor_id = Column(Integer, ForeignKey("users.id"))
    category = Column(String)
    level = Column(String)  # beginner, intermediate, advanced
    image_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    instructor = relationship("User")
    lessons = relationship("Lesson", back_populates="course", cascade="all, delete-orphan")
    enrollments = relationship("Enrollment", back_populates="course")
    materials = relationship("CourseMaterial", back_populates="course", cascade="all, delete-orphan")

class Lesson(Base):
    __tablename__ = "lessons"
    
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    title = Column(String)
    content = Column(Text)
    video_url = Column(String, nullable=True)
    order = Column(Integer)
    duration_minutes = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    course = relationship("Course", back_populates="lessons")
    assignments = relationship("Assignment", back_populates="lesson")

class Enrollment(Base):
    __tablename__ = "enrollments"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    enrolled_at = Column(DateTime, default=datetime.utcnow)
    progress = Column(Float, default=0.0)
    completed = Column(Boolean, default=False)
    
    user = relationship("User", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=True)
    message = Column(Text)
    response = Column(Text)
    message_type = Column(String)  # help, hint, summary, material_search
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="messages")

class CourseMaterial(Base):
    __tablename__ = "course_materials"
    
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    title = Column(String)
    content = Column(Text)
    material_type = Column(String)  # summary, notes, practice, reference
    generated_by_ai = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    course = relationship("Course", back_populates="materials")

class Assignment(Base):
    __tablename__ = "assignments"
    
    id = Column(Integer, primary_key=True, index=True)
    lesson_id = Column(Integer, ForeignKey("lessons.id"))
    student_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    description = Column(Text)
    submission = Column(Text, nullable=True)
    grade = Column(Float, nullable=True)
    ai_feedback = Column(Text, nullable=True)
    status = Column(String, default="pending")  # pending, submitted, graded
    due_date = Column(DateTime, nullable=True)
    submitted_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    lesson = relationship("Lesson", back_populates="assignments")
    student = relationship("User", back_populates="assignments")

class Schedule(Base):
    __tablename__ = "schedules"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=True)
    title = Column(String)
    description = Column(Text, nullable=True)
    scheduled_time = Column(DateTime)
    duration_minutes = Column(Integer)
    completed = Column(Boolean, default=False)
    reminder_sent = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


