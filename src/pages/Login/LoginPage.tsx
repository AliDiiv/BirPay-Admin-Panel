import {
  Flex,
  Box,
  useColorModeValue,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Icon,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { RiArrowRightLine } from 'react-icons/ri'
import { MdEmail, MdPhone } from 'react-icons/md'
import LoginForm from './LoginForm'
import loginImage from '../../assets/login-dark.webp'
import logo from '../../assets/BirPayLogo.svg'

const LoginPage = () => {
  const bgColor = useColorModeValue('#f0fdfa', '#092030')
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Flex height="100vh" direction={{ base: 'column', md: 'row-reverse' }}>
      {/* right section*/}
      <Box
        flex="1"
        bg="#092030"
        display={{ base: 'none', md: 'flex' }}
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={loginImage}
          alt="loginImage"
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </Box>

      {/* left section*/}
      <Box
        flex="1"
        bg={bgColor}
        px={{ base: 4, sm: 10 }}
        py={{ base: 6, sm: 10 }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          direction={{ base: 'column', md: 'row-reverse' }}
        >
          <Button variant="link" fontSize="sm">
            بازگشت <RiArrowRightLine />
          </Button>
          <Image src={logo} alt="Bir Pay logo" height="30px" />
        </Flex>

        <Flex flex="1" alignItems="center" justifyContent="center">
          <Stack spacing={5} w="100%" maxW="400px" textAlign="right">
            <Heading mt={4} fontSize="20px" fontWeight="bold" color="#f0fdfa">
              به بیر پی خوش آمدید.
            </Heading>
            <Text fontSize="14px" color="#B2B9BB" mt="-3.5">
              اولین ورود برابر با ثبت‌نام است.
            </Text>
            <LoginForm />
          </Stack>
        </Flex>

        <Box mt={8} textAlign="center" fontSize="13px" color="#B2B9BB">
          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={isMobile ? 1 : 4}
            justify="center"
            align="center"
            mb={2}
            fontSize={{ base: '12px', md: '13px' }}
          >
            <HStack spacing={1}>
              <Icon as={MdPhone} boxSize={4} />
              <Text>021-00000000</Text>
            </HStack>
            {!isMobile && <Text>|</Text>}
            <HStack spacing={1}>
              <Icon as={MdEmail} boxSize={4} />
              <Text>support@birpay.com</Text>
            </HStack>
          </Stack>
          <Text fontSize={{ base: '10px', md: '12px' }} px={4}>
            کلیه حقوق استفاده از این وب‌سایت متعلق به شرکت بیر پی می‌باشد.
          </Text>
        </Box>
      </Box>
    </Flex>
  )
}

export default LoginPage
