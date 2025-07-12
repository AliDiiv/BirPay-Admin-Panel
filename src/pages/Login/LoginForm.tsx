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

  const [step, setStep] = useState<'email' | 'phone' | 'otp'>('email')
  const [loginType, setLoginType] = useState<'email' | 'phone'>('phone')
  const [tokenDest, setTokenDest] = useState('')
  const [count, setCount] = useState(0)
  const [canResend, setCanResend] = useState(false)
  const [wrongCode, setWrongCode] = useState(false)

  // Countdown
  useEffect(() => {
    let t: any
    if (step === 'otp' && count > 0) {
      t = setInterval(() => setCount((c) => c - 1), 1000)
    } else if (count <= 0) {
      setCanResend(true)
    }
    return () => clearInterval(t)
  }, [step, count])

  // ارسال اولیه OTP
  const handleEmailSubmit = async (email: string) => {
    setLoginType('email')
    setTokenDest(email)
    const otp = await sendOtp(email, 'email')
    setStep('otp')
    setCount(180)
    setCanResend(false)
    toast({
      title: 'کد ارسال شد',
      description: `کد OTP شما: ${otp}`,
      status: 'info',
      position: 'bottom-right',
      duration: 10000,
      isClosable: true
    })
  }

  const handlePhoneSubmit = async (phone: string) => {
    setLoginType('phone')
    setTokenDest(phone)
    const otp = await sendOtp(phone, 'phone')
    setStep('otp')
    setCount(180)
    setCanResend(false)
    toast({
      title: 'کد ارسال شد',
      description: `کد OTP شما: ${otp}`,
      status: 'info',
      position: 'bottom-right',
      duration: 10000,
      isClosable: true
    })
  }

  // ارسال مجدد OTP
  const handleResendOtp = async () => {
    const otp = await sendOtp(tokenDest, loginType)
    setCount(180)
    setCanResend(false)
    toast({
      title: 'کد جدید ارسال شد',
      description: `کد جدید: ${otp}`,
      status: 'info',
      position: 'bottom-right',
      isClosable: true
    })
  }

  // بررسی کد وارد شده
  const handleOtpSubmit = async (otp: string) => {
    if (count <= 0) {
      toast({
        title: 'کد منقضی شده',
        status: 'error',
        position: 'bottom-right',
        isClosable: true
      })
      return
    }

    const valid = await verifyOtp(tokenDest, loginType, otp)
    if (valid) {
      login({
        id: Date.now().toString(),
        name: 'کاربر',
        ...(loginType === 'email'
          ? { email: tokenDest }
          : { phone: tokenDest })
      })
      toast({
        title: 'ورود موفق!',
        status: 'success',
        isClosable: true
      })
      navigate('/dashboard')
    } else {
      setWrongCode(true)
      toast({
        title: 'کد اشتباه است',
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

      {step !== 'otp' && (
        <>
          <HStack mt={8} mb={4}>
            <Divider />
            <Text fontSize="sm" color="gray.400">یا</Text>
            <Divider />
          </HStack>
          <GoogleLoginButton />
        </>
      )}
    </Box>
  )
}
