import {
  Box, Avatar, Text, VStack, IconButton, Tooltip, useColorModeValue,
  Divider
} from '@chakra-ui/react'
import { useState } from 'react'
import { MdDashboard, MdPayment, MdSettings, MdSupportAgent } from 'react-icons/md'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { LuWallet } from 'react-icons/lu'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../types/store'


type MenuItem = {
  label: string
  icon: any
  key?: string
  href?: string
}

const menuItems: MenuItem[] = [
  { label: 'پیشخوان', icon: MdDashboard, href: '/dashboard' },
  { label: 'درگاه پرداخت', icon: MdPayment, href: '/gateway' },
  { label: 'تسویه حساب', icon: LuWallet, href: '/wallet' },
  { label: 'پشتیبانی', icon: MdSupportAgent, href: '/support' },
  { label: 'تنظیمات', icon: MdSettings, href: '/settings' }
]

const MotionBox = motion(Box)

export default function Sidebar({ isMobile = false }: { isMobile?: boolean }) {
  const [collapsed, setCollapsed] = useState(false)
  const avatar = useSelector((state: RootState) => state.user.profile?.avatar)
  const sidebarBg = useColorModeValue('white', '#021726')
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')

  const sidebarWidth = isMobile ? '250px' : (collapsed ? '72px' : '250px')

  return (
    <MotionBox
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0, width: sidebarWidth }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      p={4}
      mt={4}
      mx={4}
      borderRadius="lg"
      bg={sidebarBg}
      boxShadow="lg"
      borderColor={useColorModeValue('gray.200', 'gray.600')}
      overflow="hidden"
    >
      <Box textAlign="center" mb={6}>
        {/* {avatar && (
          <Image src={avatar} name="علی محمد جعفری" size="md" mx="auto" mb={collapsed ? 0 : 2} />
        )} */}
        <Avatar name="علی محمد جعفری" size="md" mx="auto" mb={collapsed ? 0 : 2} />
        {!collapsed && (
          <Text fontSize="sm" fontWeight="bold" color={textColor} transition="all 0.3s ease">
            علی محمد جعفری
          </Text>
        )}
      </Box>

      <Divider mb={4} />

      <VStack spacing={1} align="stretch">
        {menuItems.map((item) => {
          const content = (
            <MotionBox
              key={item.label}
              display="flex"
              alignItems="center"
              gap={collapsed ? 0 : 3}
              p={collapsed ? 2 : 3}
              borderRadius="md"
              cursor="pointer"
              _hover={{ bg: hoverBg }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200 }}
              color={textColor}
              justifyContent={collapsed ? 'center' : 'flex-start'}
            >
              <Box as={item.icon} fontSize={collapsed ? '20px' : '24px'} />
              {!collapsed && (
                <Text fontSize="sm" transition="all 0.3s ease">
                  {item.label}
                </Text>
              )}
            </MotionBox>
          )

          return (
            <Tooltip
              key={item.label}
              label={collapsed ? item.label : ''}
              placement="right"
              hasArrow
            >
              {item.href ? (
                <Link to={item.href}>{content}</Link>
              ) : content}
            </Tooltip>
          )
        })}
      </VStack>

      {!isMobile && (
        <IconButton
          mt={6}
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <FaChevronLeft /> : <FaChevronRight />}
          aria-label="Toggle Sidebar"
          mx="auto"
          display="block"
          variant="ghost"
        />
      )}
    </MotionBox>
  )
}
