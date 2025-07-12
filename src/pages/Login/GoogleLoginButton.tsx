import { Button } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function GoogleLoginButton() {
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const handleClick = () => {
    const user = { id: Date.now().toString(), name: 'گوگل کاربر', email: 'user@gmail.com' }
    login(user)
    toast({ title: 'ورود با Google موفق بود', status: 'success', isClosable: true })
    navigate('/dashboard')
  }

  return (
    <Button leftIcon={<FcGoogle />} variant="outline" width="full" colorScheme="teal" fontWeight="bold" onClick={handleClick}>
      ورود با Google
    </Button>
  )
}
