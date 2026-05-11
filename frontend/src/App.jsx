import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentLayout from './layouts/StudentLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import StudyPlan from './pages/student/StudyPlan';
import WeakSubjects from './pages/student/WeakSubjects';
import Resources from './pages/student/Resources';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from '@/components/ui/sonner';

// Protected Route Wrapper Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null; // Or a spinner
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Student Protected Routes */}
            <Route path="/student" element={
              <ProtectedRoute>
                <StudentLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/student/dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="plan" element={<StudyPlan />} />
              <Route path="analysis" element={<WeakSubjects />} />
              <Route path="resources" element={<Resources />} />
            </Route>
            
          </Routes>
          <Toaster richColors position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
