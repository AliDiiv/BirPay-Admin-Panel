import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Component to protect routes that require authentication
export default function ProtectedRoute() {
  // Access the authentication state from the context
  const { isAuthenticated } = useAuth()

  // If authenticated, render the child route(s); otherwise redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
