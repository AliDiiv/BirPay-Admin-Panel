import { Box, Text, Icon, useColorModeValue } from '@chakra-ui/react'
import { FiInbox } from 'react-icons/fi'

export default function EmptyState() {
  const bg = useColorModeValue('white', '#021726')
  return (
    <Box textAlign="center" py={10} bg={bg}>
      <Icon as={FiInbox} boxSize={10} color="gray.400" />
      <Text mt={3} color="gray.500">نتیجه‌ای یافت نشد.</Text>
    </Box>
  )
}
