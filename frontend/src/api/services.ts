import api from './axios'

// Auth Services
export const authService = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
}

// Course Services
export const courseService = {
  getCourses: () => api.get('/courses'),
  getCourse: (id: number) => api.get(`/courses/${id}`),
  createCourse: (data: any) => api.post('/courses', data),
  updateCourse: (id: number, data: any) => api.put(`/courses/${id}`, data),
  deleteCourse: (id: number) => api.delete(`/courses/${id}`),
  getLessons: (courseId: number) => api.get(`/courses/${courseId}/lessons`),
  getMaterials: (courseId: number) => api.get(`/courses/${courseId}/materials`),
}

// Lesson Services
export const lessonService = {
  createLesson: (data: any) => api.post('/lessons', data),
  updateLesson: (id: number, data: any) => api.put(`/lessons/${id}`, data),
  deleteLesson: (id: number) => api.delete(`/lessons/${id}`),
}

// Enrollment Services
export const enrollmentService = {
  enroll: (courseId: number) => api.post('/enrollments', { course_id: courseId }),
  getMyEnrollments: () => api.get('/my-enrollments'),
}

// AI Services
export const aiService = {
  chat: (data: any) => api.post('/ai/chat', data),
  getChatHistory: (courseId?: number) =>
    api.get('/ai/chat-history', { params: { course_id: courseId } }),
  generateSummary: (data: any) => api.post('/ai/generate-summary', data),
  generatePractice: (lessonId: number, difficulty: string) =>
    api.post(`/ai/generate-practice?lesson_id=${lessonId}&difficulty=${difficulty}`),
  getResources: (topic: string, level: string) =>
    api.get(`/ai/resources?topic=${topic}&level=${level}`),
  generateSchedule: (data: any) => api.post('/ai/generate-schedule', data),

  // очистка истории чата
  clearHistory: (courseId?: number) =>
    api.delete('/ai/chat-history', { params: { course_id: courseId } }),
}

// Assignment Services
export const assignmentService = {
  create: (data: any) => api.post('/assignments', data),
  submit: (id: number, submission: string) =>
    api.post(`/assignments/${id}/submit`, { submission }),
  getMyAssignments: () => api.get('/my-assignments'),
}

// Schedule Services
export const scheduleService = {
  create: (data: any) => api.post('/schedules', data),
  getMySchedule: () => api.get('/my-schedule'),
}

// Materials Services (для курсов и "мои материалы")
export const materialsService = {
  getByCourse: (courseId: number) => api.get(`/courses/${courseId}/materials`),
  getMyMaterials: () => api.get('/my-materials'),
}
