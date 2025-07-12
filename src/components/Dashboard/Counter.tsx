import { Box, Text, HStack, Icon, Breadcrumb, BreadcrumbItem, BreadcrumbLink, useColorModeValue } from '@chakra-ui/react'
import { FiPlusSquare, FiCreditCard, FiLock } from 'react-icons/fi'

export default function Counter() {
  const bg = useColorModeValue('white', '#021726')
  return (
    <Box p={4} bg={bg} borderRadius="lg" boxShadow="md" mb={4} height="150px">
      <Breadcrumb fontSize="sm" color="gray.500" mb={2} separator="/">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">خانه</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/dashboard">پیشخوان</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <HStack>
        <Text fontSize="xl" fontWeight="bold" mt={3}>پیشخوان</Text>
      </HStack>


      <HStack justify="space-between" flexWrap="wrap" mt={4}>
        <Text fontSize="xl" fontWeight="bold"></Text>
        <HStack spacing={6} mt={{ base: 2, md: 0 }}>
          <HStack>
            <Icon as={FiCreditCard} />
            <Text fontSize="sm">درگاه جدید</Text>
          </HStack>
          <HStack>
            <Icon as={FiLock} />
            <Text fontSize="sm">تیکت جدید</Text>
          </HStack>
          <HStack>
            <Icon as={FiPlusSquare} />
            <Text fontSize="sm">تسویه کیف پول</Text>
          </HStack>
        </HStack>
      </HStack>
    </Box>
  )
}
