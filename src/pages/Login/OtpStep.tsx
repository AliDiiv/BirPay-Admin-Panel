import {
  Box, VStack, Button, Text, HStack, PinInput, PinInputField
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { PetoEn } from '../../utils/utils'

const MotionBox = motion(Box)

type Props = {
  onOtpSubmit: (otp: string) => void
  onBack: () => void
  countdown: number
  onResend?: () => void
  canResend?: boolean
  wrongCodeTrigger?: boolean
}

export default function OtpStep({
  onOtpSubmit,
  onBack,
  countdown,
  onResend,
  canResend,
  wrongCodeTrigger = false
}: Props) {
  const [otp, setOtp] = useState('')

  // Handle input change, normalize characters and remove spaces
  const handleChange = (val: string) => {
    const fixed = PetoEn(val.replace(/\s/g, ''))
    setOtp(fixed)
  }

  return (
    <Box position="relative" w="100%" dir="ltr">
      <VStack spacing={6}>
        {/* Animated box that shakes horizontally on wrong OTP */}
        <MotionBox
          animate={wrongCodeTrigger ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <HStack justify="center">
            {/* OTP input with 6 digits */}
            <PinInput
              otp
              value={otp}
              onChange={handleChange}
              onComplete={handleChange}
              placeholder=""
              autoFocus
              inputMode="numeric"
              type="number"
              mask={false}
              isDisabled={false}
              focusBorderColor="teal.500"
            >
              {/* Render 6 individual input fields */}
              {Array.from({ length: 6 }).map((_, i) => (
                <PinInputField
                  key={i}
                  bg="#0F2C3F"
                  color="white"
                  border="1px solid #2F4F5D"
                  _placeholder={{ color: 'gray.400' }}
                  textAlign="center"
                  fontSize="xl"
                  dir="ltr"
                />
              ))}
            </PinInput>
          </HStack>
        </MotionBox>

        {/* Submit button disabled until OTP length is 6 */}
        <Button
          colorScheme="teal"
          width="full"
          onClick={() => onOtpSubmit(otp)}
          isDisabled={otp.length !== 6}
        >
          ورود
        </Button>

        {/* Navigation buttons: Back and optionally Resend */}
        <HStack justify="space-between" width="full">
          {/* Empty disabled button (can be removed) */}
          <Button
            variant="link"
            width="full"
            onClick={onBack}
            isDisabled
          >
          </Button>

          {/* Back button */}
          <Button variant="link" onClick={onBack}>بازگشت</Button>

          {/* Resend button shown conditionally */}
          {canResend && onResend && (
            <Button variant="link" colorScheme="blue" onClick={onResend}>
              ارسال مجدد کد
            </Button>
          )}
        </HStack>
      </VStack>

      {/* Countdown timer or expired message */}
      <Text position="absolute" bottom="0" left="0" fontSize="xs" p={2} color="gray.500">
        {countdown > 0
          ? `زمان باقی‌مانده: ${Math.floor(countdown / 60)}:${('0' + (countdown % 60)).slice(-2)}`
          : 'کد منقضی شده'}
      </Text>
    </Box>
  )
}