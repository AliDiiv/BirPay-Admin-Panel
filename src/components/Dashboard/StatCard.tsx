import { Box, Flex, Text, Divider, useColorModeValue } from '@chakra-ui/react'
import { ReactElement } from 'react'

interface StatCardProps {
  icon: ReactElement
  label: string
  value: string
  footer: string
}

export default function StatCard({ icon, label, value, footer }: StatCardProps) {
  const bg = useColorModeValue('white', '#021726')
  return (
    <Box
      p={4}
      borderRadius="lg"
      bg={bg}
      boxShadow="md"
      w="full"
      minW={{ base: '100%', sm: '48%', md: '23%' }}
      transition="0.2s"
    >
      <Flex align="center" gap={3} color="#10b981" fontSize="3xl">
        {icon}
      </Flex>
      <Text mt={2} fontWeight="bold">{label}</Text>
      <Text color="gray.500" fontSize="md" mt={3}>{value} <span>ریال</span></Text>
      <Divider my={2} />
      <Text fontSize="xs" color="#10b981">{footer}</Text>
    </Box>
  )
}
