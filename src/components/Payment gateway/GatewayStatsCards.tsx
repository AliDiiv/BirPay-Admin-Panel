import { SimpleGrid, Box, Text, Badge, useColorModeValue } from '@chakra-ui/react'

const stats = [
  { label: 'امروز', count: '۱۷', amount: '۳۴,۳۴۵,۰۰۰' },
  { label: '۷ روز گذشته', count: '۳۴', amount: '۳۴,۳۴۵,۰۰۰' },
  { label: '۳۰ روز گذشته', count: '۷۴', amount: '۷۴,۳۴۵,۰۰۰' }
]

export default function GatewayStatsCards() {
  const bg = useColorModeValue('white', '#021726')
  return (
    <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={4} mt={4}>
      {stats.map((s, i) => (
        <Box key={i} p={4} bg={bg} borderRadius="lg" boxShadow="sm" >
          <Text fontWeight="bold">{s.label}</Text>
          <Badge colorScheme="blue" mt={2}>تعداد</Badge>
          <Text>{s.count}</Text>
          <Badge colorScheme="gray" mt={2}>مبلغ</Badge>
          <Text>{s.amount}</Text>
        </Box>
      ))}
    </SimpleGrid>
  )
}
