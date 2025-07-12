import { Button } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function GoogleLoginButton() {
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  // Handle click on Google login button
  const handleClick = () => {
    // Simulate a user object returned from Google login
    const user = { id: Date.now().toString(), name: 'Google User', email: 'user@gmail.com' }
    
    // Call login method from context to update auth state
    login(user)
    
    // Show success toast notification
    toast({ title: 'Google login successful', status: 'success', isClosable: true })
    
    // Navigate to dashboard after login
    navigate('/dashboard')
  }

  return (
    <Button
      leftIcon={<FcGoogle />}
      variant="outline"
      width="full"
      colorScheme="teal"
      fontWeight="bold"
      onClick={handleClick}
    >
      ورود با Google
    </Button>
  )
}
