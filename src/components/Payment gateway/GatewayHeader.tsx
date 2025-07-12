import { FiPlus } from 'react-icons/fi'
import { Box, Text, HStack, Button, Breadcrumb, BreadcrumbItem, BreadcrumbLink, useColorModeValue } from '@chakra-ui/react'

export default function GatewayHeader() {
  const bg = useColorModeValue('white', '#021726')
  return (

    <Box p={4} borderRadius="lg" boxShadow="md" mb={4} height="150px" bg={bg}>
      <Breadcrumb fontSize="sm" color="gray.500" mb={2} separator="/">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">خانه</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/dashboard">درگاه‌ها</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <HStack>
        <Text fontSize="xl" fontWeight="bold" mt={3}>درگاه‌ها</Text>
      </HStack>

      <HStack justify="space-between" flexWrap="wrap" mt={4}>
        <Text fontSize="xl" fontWeight="bold"></Text>
        <HStack spacing={6} mt={{ base: 2, md: 0 }}>
          <HStack>
            <Button leftIcon={<FiPlus />} variant="outline" size="sm">ساخت درگاه جدید</Button>
          </HStack>
        </HStack>
      </HStack>
    </Box>
  )
}
