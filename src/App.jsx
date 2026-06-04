import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { ToastProvider } from './hooks/useToast'
import LandingPage from './pages/LandingPage'
import MessagesPage from "./pages/MessagesPage"
import AppShell from './pages/AppShell'
import ProfilePage from './pages/ProfilePage'

function PrivateRoute({ children }) {
  const { token, user } = useAuth();

  return token && user ? children : <Navigate to="/" replace />;
}

function PublicRoute({ children }) {
  const { token } = useAuth();
  return token ? <Navigate to="/app" replace /> : children;
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>

          <Route 
            path="/" 
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            } 
          />

          <Route
            path="/app/*"
            element={
              <PrivateRoute>
                <AppShell />
              </PrivateRoute>
            }
          />

          <Route
            path="/app/messages/:id"
            element={
              <PrivateRoute>
                <MessagesPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/app/profile/:id"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          <Route 
            path="*" 
            element={<Navigate to="/app" replace />} 
          />

        </Routes>
      </ToastProvider>
    </AuthProvider>
  )
}