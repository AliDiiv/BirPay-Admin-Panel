import { Box, Text, Image } from '@chakra-ui/react'

export default function UserDocuments() {
  return (
    <Box>
      <Text mb={4} fontWeight="medium">مدارک مورد نیاز</Text>
      <Box>
        <Image src="/assets/national-card.png" alt="کارت ملی" boxSize="120px" objectFit="cover" />
        <Text fontSize="sm" mt={2}>کارت ملی</Text>
      </Box>
    </Box>
  )
}
