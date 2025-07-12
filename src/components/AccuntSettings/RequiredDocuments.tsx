import {
  VStack, Image, Text, Box, Input, Button, useToast
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../types/store'
import { setDocument } from '../../types/userSlice'
import { useRef } from 'react'

export default function RequiredDocuments() {
  const dispatch = useDispatch<AppDispatch>()
  const toast = useToast()
  const inputRef = useRef<HTMLInputElement>(null)
  const documentUrl = useSelector((state: RootState) => state.user.profile?.documentUrl)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        dispatch(setDocument(reader.result))
        toast({
          title: 'مدرک با موفقیت بارگذاری شد',
          status: 'success',
          duration: 2000,
          isClosable: true
        })
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <VStack spacing={3} mt={8} align="center" w="full">
      <Text fontWeight="bold" fontSize="md">مدارک مورد نیاز</Text>

      <Box boxSize="150px" bg="gray.50" borderRadius="md" p={2}>
        {documentUrl ? (
          <Image
            src={documentUrl}
            alt="کارت ملی"
            objectFit="cover"
            w="full"
            h="full"
            borderRadius="md"
          />
        ) : (
          <Text fontSize="sm" color="gray.500">مدرکی بارگذاری نشده است</Text>
        )}
      </Box>

      <Text fontSize="sm" color="gray.600">کارت ملی</Text>

      <Button
        onClick={() => inputRef.current?.click()}
        variant="outline"
        size="sm"
        colorScheme="teal"
      >
        آپلود مدرک
      </Button>

      <Input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleUpload}
        display="none"
      />
    </VStack>
  )
}
