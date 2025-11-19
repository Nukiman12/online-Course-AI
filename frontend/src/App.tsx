import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import MyCourses from './pages/MyCourses'
import AIChat from './pages/AIChat'
import Dashboard from './pages/Dashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import MyMaterials from './pages/MyMaterials'

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())
  const isTeacher = useAuthStore((state) => state.isTeacher())

  return (
    <Routes>
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
      />

      <Route element={<Layout />}>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/courses"
          element={isAuthenticated ? <Courses /> : <Navigate to="/login" />}
        />
        <Route
          path="/courses/:id"
          element={isAuthenticated ? <CourseDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-courses"
          element={isAuthenticated ? <MyCourses /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-materials"
          element={isAuthenticated ? <MyMaterials /> : <Navigate to="/login" />}
        />
        <Route
          path="/ai-chat"
          element={isAuthenticated ? <AIChat /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/teacher"
          element={
            isAuthenticated && isTeacher ? (
              <TeacherDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Route>
    </Routes>
  )
}

export default App
