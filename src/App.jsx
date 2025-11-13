import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/NavbarBootstrap';
import Footer from './components/FooterBootstrap';
import Home from './pages/HomeBootstrap';
import About from './pages/AboutBootstrap';
import Contact from './pages/ContactBootstrap';
import Terms from './pages/TermsBootstrap';
import Login from './pages/auth/LoginBootstrap';
import StudentLogin from './pages/auth/StudentLoginBootstrap';
import TeacherLogin from './pages/auth/TeacherLoginBootstrap';
import TeacherSignup from './pages/auth/TeacherSignupBootstrap';
import SignIn from './pages/auth/SignInBootstrap';
import StudentProfile from './pages/student/StudentProfileBootstrap'; // Updated to Bootstrap version
import StudentReport from './pages/student/StudentReport';
import TeacherDashboard from './pages/teacher/TeacherDashboardBootstrap'; // Updated to Bootstrap version
import Notes from './pages/NotesBootstrap';
import Quizzes from './pages/QuizzesBootstrap';
import QuizTake from './pages/QuizTakeBootstrap';
import PYQs from './pages/PYQsBootstrap';
import RecordedLectures from './pages/RecordedLecturesBootstrap';
import OfflineIndicator from './components/OfflineIndicator';

// Protected route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

function AppRoutes() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/teacher-signup" element={<TeacherSignup />} />
          <Route path="/signin" element={<SignIn />} />
          
          {/* Protected routes - Student */}
          <Route 
            path="/student/profile" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/report" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentReport />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected routes - Teacher */}
          <Route 
            path="/teacher/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected routes - Both */}
          <Route 
            path="/notes" 
            element={
              <ProtectedRoute allowedRoles={['student', 'teacher']}>
                <Notes />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/quizzes" 
            element={
              <ProtectedRoute allowedRoles={['student', 'teacher']}>
                <Quizzes />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/quiz/:quizId" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <QuizTake />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pyqs" 
            element={
              <ProtectedRoute allowedRoles={['student', 'teacher']}>
                <PYQs />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lectures" 
            element={
              <ProtectedRoute allowedRoles={['student', 'teacher']}>
                <RecordedLectures />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
      <OfflineIndicator />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;