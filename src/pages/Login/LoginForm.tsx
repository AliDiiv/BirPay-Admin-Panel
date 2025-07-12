import {
  Box, HStack, Divider, Text, useToast
} from '@chakra-ui/react'
import AuthTabs from './AuthTabs'
import OtpStep from './OtpStep'
import GoogleLoginButton from './GoogleLoginButton'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useToastError } from '../../hooks/useToastError'
import { sendOtp, verifyOtp } from '../../api/otpService'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const { login } = useAuth()
  const toast = useToast()
  useToastError()
  const navigate = useNavigate()

  // Current step of the form ('email', 'phone', or 'otp')
  const [step, setStep] = useState<'email' | 'phone' | 'otp'>('email')
  // Which login method is active ('email' or 'phone')
  const [loginType, setLoginType] = useState<'email' | 'phone'>('phone')
  // Destination to send OTP (email or phone)
  const [tokenDest, setTokenDest] = useState('')
  // Countdown timer for OTP validity in seconds
  const [count, setCount] = useState(0)
  // Whether the resend OTP button is enabled
  const [canResend, setCanResend] = useState(false)
  // Flag to trigger wrong OTP animation and message
  const [wrongCode, setWrongCode] = useState(false)

  // Countdown timer effect runs when on OTP step and count > 0
  useEffect(() => {
    let t: any
    if (step === 'otp' && count > 0) {
      t = setInterval(() => setCount((c) => c - 1), 1000)
    } else if (count <= 0) {
      // Enable resend button when countdown ends
      setCanResend(true)
    }
    return () => clearInterval(t)
  }, [step, count])

  // Handle submission of email login form - send OTP via email
  const handleEmailSubmit = async (email: string) => {
    setLoginType('email')
    setTokenDest(email)
    const otp = await sendOtp(email, 'email')
    setStep('otp')
    setCount(180) // 3 minutes countdown
    setCanResend(false)
    toast({
      title: 'OTP sent',
      description: `Your OTP code: ${otp}`,
      status: 'info',
      position: 'bottom-right',
      duration: 10000,
      isClosable: true
    })
  }

  // Handle submission of phone login form - send OTP via SMS
  const handlePhoneSubmit = async (phone: string) => {
    setLoginType('phone')
    setTokenDest(phone)
    const otp = await sendOtp(phone, 'phone')
    setStep('otp')
    setCount(180)
    setCanResend(false)
    toast({
      title: 'OTP sent',
      description: `Your OTP code: ${otp}`,
      status: 'info',
      position: 'bottom-right',
      duration: 10000,
      isClosable: true
    })
  }

  // Resend OTP when user clicks resend button
  const handleResendOtp = async () => {
    const otp = await sendOtp(tokenDest, loginType)
    setCount(180)
    setCanResend(false)
    toast({
      title: 'New OTP sent',
      description: `New OTP: ${otp}`,
      status: 'info',
      position: 'bottom-right',
      isClosable: true
    })
  }

  // Verify the OTP entered by user
  const handleOtpSubmit = async (otp: string) => {
    if (count <= 0) {
      // If OTP expired, notify user
      toast({
        title: 'OTP expired',
        status: 'error',
        position: 'bottom-right',
        isClosable: true
      })
      return
    }

    const valid = await verifyOtp(tokenDest, loginType, otp)
    if (valid) {
      // Successful login
      login({
        id: Date.now().toString(),
        name: 'User',
        ...(loginType === 'email'
          ? { email: tokenDest }
          : { phone: tokenDest })
      })
      toast({
        title: 'Login successful!',
        status: 'success',
        isClosable: true
      })
      navigate('/dashboard')
    } else {
      // Wrong OTP entered, trigger animation and show error
      setWrongCode(true)
      toast({
        title: 'Invalid OTP code',
        status: 'error',
        isClosable: true
      })
      setTimeout(() => setWrongCode(false), 500)
    }
  }

  return (
    <Box w="full">
      {step === 'otp' ? (
        <OtpStep
          onOtpSubmit={handleOtpSubmit}
          onBack={() => setStep(loginType)}
          countdown={count}
          onResend={handleResendOtp}
          canResend={canResend}
          wrongCodeTrigger={wrongCode}
        />
      ) : (
        <AuthTabs
          onEmailSubmit={handleEmailSubmit}
          onPhoneSubmit={handlePhoneSubmit}
        />
      )}

      {/* Show alternative login options only if not in OTP step */}
      {step !== 'otp' && (
        <>
          <HStack mt={8} mb={4}>
            <Divider />
            <Text fontSize="sm" color="gray.400">or</Text>
            <Divider />
          </HStack>
          <GoogleLoginButton />
        </>
      )}
    </Box>
  )
}
