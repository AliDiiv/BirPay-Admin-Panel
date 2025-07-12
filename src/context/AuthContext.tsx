
import React, { createContext, useContext, useEffect, useState } from 'react'

// Define the structure of a User object
type User = {
  id: string
  name: string
  email?: string   
  phone?: string   
}

// Define the shape of the authentication context
type AuthContextType = {
  user: User | null               
  isAuthenticated: boolean       
  login: (userData: User) => void 
  logout: () => void              
}

// Create the authentication context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
})

// AuthProvider component to wrap the app and provide auth context
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null) 

  // On component mount, check if user data exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Function to log in a user and store in localStorage
  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('auth_user', JSON.stringify(userData))
  }

  // Function to log out a user and clear from localStorage
  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
  }

  // Provide the user, login, logout, and authentication status to children components
  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the AuthContext easily in other components
export const useAuth = () => useContext(AuthContext)
