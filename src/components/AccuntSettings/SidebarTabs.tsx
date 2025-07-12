import {
  VStack,
  Button,
  useColorModeValue,
  Box
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

type TabItem = {
  label: string
  href: string
}

const tabs: TabItem[] = [
  { label: 'اطلاعات کاربری', href: '/settings' },
  { label: 'تنظیمات امنیتی', href: '/settings/security' },
  { label: 'تنظیمات اعلان', href: '/settings/notification' },
  { label: 'دستگاه‌ها', href: '/settings/devices' },
  { label: 'پذیرندگی', href: '/settings/merchant' }
]

export default function SidebarTabs() {
  const bg = useColorModeValue('white', '#021726')

  return (
    <Box
      p={4}
      bg={bg}
      borderRadius="lg"
      boxShadow="md"
      w={{ base: '100%', md: '200px' }}
      overflowX="auto"
    >
      <VStack align="start" spacing={3} w="100%">
        {tabs.map((tab) => (
          <Button
            key={tab.href}
            as={NavLink}
            to={tab.href}
            variant="ghost"
            w="full"
            fontSize={{ base: 'sm', md: 'md' }}
            justifyContent="start"
            _activeLink={{ bg: 'teal.500', color: 'white' }}
            _hover={{ bg: 'gray.200' }}
          >
            {tab.label}
          </Button>
        ))}
      </VStack>
    </Box>
  )
}
