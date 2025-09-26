import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Switch,
  Divider,
  useColorModeValue,
  useToast,
  Flex
} from '@chakra-ui/react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../types/store'
import SidebarTabs from '../SidebarTabs'



export default function AccountSecurity() {
  // const dispatch = useDispatch<AppDispatch>()
  const toast = useToast()
  const profile = useSelector((state: RootState) => state.user.profile)
  const bg = useColorModeValue('white', '#021726')
  const [password, setPassword] = useState('')
  const [twoFA, setTwoFA] = useState(false)

  const handlePasswordChange = () => {
    // TODO: ارسال اطلاعات اصلاح‌شده به سرور
    toast({ title: 'رمز جدید تنظیم شد', status: 'success', duration: 2000 })
    setPassword('')
  }

  const handleToggle2FA = () => {
    setTwoFA(prev => !prev)
    // TODO: ارسال 2FA به سرور
    toast({ title: twoFA ? '2FA غیرفعال شد' : '2FA فعال شد', status: 'info', duration: 2000 })
  }

  return (
    <Flex direction={{ base: 'column', md: 'row' }} p={4} minH="50vh" gap={4}>
      <SidebarTabs />
      <Box p={4} bg={bg} borderRadius="lg" boxShadow="md">
        <VStack align="start" spacing={6}>
          <Text fontSize="lg" fontWeight="bold">تنظیمات امنیتی</Text>
          <Divider />

          {/* تغییر رمز عبور */}
          <HStack justify="space-between" w="100%">
            <Text>کلمه عبور</Text>
            <HStack>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ border: "1px solid #ccc", padding: "4px 8px", borderRadius: "4px" }}
              />
              <Button variant="link" onClick={handlePasswordChange}>
                تغییر
              </Button>
            </HStack>
          </HStack>


          {/* تغییر تلفن همراه */}
          <HStack justify="space-between" w="100%">
            <Text>تلفن همراه</Text>
            <HStack spacing={2}>
              <Text fontSize="sm" color="gray.500">
                {profile?.mobile} – تأیید‌شده
              </Text>
              <Button variant="link" colorScheme="blue" size="sm">
                تغییر شماره همراه
              </Button>
            </HStack>
          </HStack>

          {/* تغییر ایمیل */}
          <HStack justify="space-between" w="100%">
            <Text>پست الکترونیکی</Text>
            <HStack spacing={2}>
              <Text fontSize="sm" color="gray.500">
                {profile?.email} – تأیید‌شده
              </Text>
              <Button variant="link" colorScheme="blue" size="sm">
                تغییر ایمیل
              </Button>
            </HStack>
          </HStack>

          {/* اتصال به تلگرام */}
          <HStack justify="space-between" w="100%">
            <Text>حساب تلگرام</Text>
            <Button variant="link" colorScheme="blue" size="sm">
              اتصال به تلگرام
            </Button>
          </HStack>

          <Divider />

          {/* تنظیم رمز دوم */}
          <VStack align="start">
            <Text>رمز دوم</Text>
            <Text fontSize="sm" color="gray.500">
              برای تغییر رمز دوم، درخواست تسویه بدون واردکردن رمز دوم مقدور نیست...
            </Text>
            <Button variant="link" colorScheme="blue">
              تنظیم
            </Button>
          </VStack>

          <Divider />

          {/* تأیید صحت دومرحله‌ای */}
          <HStack justify="space-between" w="100%">
            <VStack align="start">
              <Text>تأیید صحت دومرحله‌ای</Text>
              <Text fontSize="sm" color="gray.500">
                به کمک تأیید صحت دو‌مرحله‌ای می‌توانید از دسترسی افراد غیرمجاز...
              </Text>
            </VStack>
            <Switch isChecked={twoFA} onChange={handleToggle2FA} />
          </HStack>
        </VStack>
      </Box>
    </Flex>

  )
}
