import { Box, Text, VStack, useColorModeValue, HStack, Avatar } from '@chakra-ui/react'

const notifications = [
  { id: 1, name: 'Nat', email: 'nat@info.com', avatar: '/img/Photo.png' },
  { id: 2, name: 'Ali', email: 'ali@crypto.com', avatar: '/img/Photo.png' },
]

export default function Notifications() {
  const bg = useColorModeValue('white', 'gray.700')

  return (
    <Box bg={bg} p={4} borderRadius="lg" boxShadow="md" mt={6}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>پیام‌ها / اعلان‌ها</Text>
      <VStack spacing={4} align="stretch">
        {notifications.map((n) => (
          <HStack key={n.id}>
            <Avatar src={n.avatar} name={n.name} size="sm" />
            <Box>
              <Text fontWeight="medium">{n.name}</Text>
              <Text fontSize="sm" color="gray.500">{n.email}</Text>
            </Box>
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}
