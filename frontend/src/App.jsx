import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentLayout from './layouts/StudentLayout';
import StudentDashboard from './pages/student/StudentDashboard';
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
                {/* For testing right now, anyone logged in defaults to here. Phase 4 will introduce role-checks. */}
                <StudentLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/student/dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              {/* Placeholders for future pages */}
              <Route path="plan" element={<div className="p-6 text-foreground">Study Plan (Coming Soon)</div>} />
              <Route path="analysis" element={<div className="p-6 text-foreground">Weak Subjects Analysis (Coming Soon)</div>} />
              <Route path="resources" element={<div className="p-6 text-foreground">Recommendations (Coming Soon)</div>} />
            </Route>

            {/* Admin Protected Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                {/* For testing right now, anyone logged in enters the admin shell */}
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              {/* Placeholders for future pages */}
              <Route path="students" element={<div className="p-6 text-foreground">Students Management (Coming Soon)</div>} />
              <Route path="activity" element={<div className="p-6 text-foreground">Recent Activity (Coming Soon)</div>} />
              <Route path="merchants" element={<div className="p-6 text-foreground">Merchant History (Coming Soon)</div>} />
              <Route path="reports" element={<div className="p-6 text-foreground">Reports (Coming Soon)</div>} />
              <Route path="management" element={<div className="p-6 text-foreground">Management (Coming Soon)</div>} />
              <Route path="database" element={<div className="p-6 text-foreground">Main Database (Coming Soon)</div>} />
              <Route path="profile" element={<div className="p-6 text-foreground">Profile (Coming Soon)</div>} />
            </Route>
            
          </Routes>
          <Toaster richColors position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
