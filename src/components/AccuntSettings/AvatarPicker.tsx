import {
  Box,
  SimpleGrid,
  Image,
  Button,
  VStack,
  Text,
  useToast,
  Input
} from '@chakra-ui/react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../types/store'
import { setAvatar } from '../../types/userSlice'

const sampleAvatars = [
  './avatars/1.png',
  './avatars/2.png',
  './avatars/3.png',
  './avatars/4.png',
  './avatars/5.png',
  './avatars/6.png'
]

export default function AvatarPicker() {
  const dispatch = useDispatch<AppDispatch>()
  const toast = useToast()
  const inputRef = useRef<HTMLInputElement>(null)
  const avatar = useSelector((state: RootState) => state.user.profile?.avatar)

  const handleAvatarSelect = (src: string) => {
    dispatch(setAvatar(src))
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      const result = reader.result
      if (typeof result === 'string') {
        dispatch(setAvatar(result))
        toast({
          title: 'آواتار آپلود شد',
          status: 'success',
          duration: 2000,
          isClosable: true
        })
      } else {
        toast({
          title: 'فرمت تصویر نامعتبر است',
          status: 'error',
          isClosable: true
        })
      }
    }

    reader.readAsDataURL(file)
  }


  return (
    <VStack spacing={4} align="center" mt={4}>
      <Text fontWeight="bold">آواتار (تصویر پروفایل)</Text>
      <Text fontSize="sm" color="gray.500">انتخاب از نمونه‌ها</Text>

      <SimpleGrid columns={3} spacing={3}>
        {sampleAvatars.map(src => (
          <Box
            key={src}
            border={avatar === src ? '2px solid teal' : '1px solid #ccc'}
            borderRadius="md"
            p={1}
            cursor="pointer"
            onClick={() => handleAvatarSelect(src)}
            _hover={{ borderColor: 'teal.400' }}
          >
            <Image src={src} alt="avatar" boxSize="60px" borderRadius="full" />
          </Box>
        ))}
      </SimpleGrid>

      {avatar && (
        <Image src={avatar} alt="Selected avatar" boxSize="100px" borderRadius="full" mt={4} />
      )}

      <Button
        onClick={() => inputRef.current?.click()}
        variant="outline"
        colorScheme="teal"
        size="sm"
      >
        آپلود آواتار
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
