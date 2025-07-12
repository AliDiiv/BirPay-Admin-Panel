import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, ModalFooter,
  FormControl, FormLabel, Input, Textarea,
  Box, useToast,
  useColorModeValue
} from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'

export default function TicketModal({
  isOpen,
  onClose,
  onCreated
}: {
  isOpen: boolean
  onClose: () => void
  onCreated: () => void
}) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const bg = useColorModeValue('#EFF2F5', '#092030')
  const toast = useToast()

  const handleSubmit = async () => {
    if (!title || !desc) return toast({ title: 'لطفاً همه موارد را پر کنید', status: 'error' })
    const ticket = { title, desc, createdAt: new Date().toISOString(), file: '' }

    if (file) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        ticket.file = reader.result as string
        await axios.post('http://localhost:3000/tickets', ticket)
        toast({ title: 'تیکت ساخته شد', status: 'success' })
        onCreated()
        onClose()
      }
      reader.readAsDataURL(file)
    } else {
      await axios.post('http://localhost:3000/tickets', ticket)
      toast({ title: 'تیکت ساخته شد', status: 'success' })
      onCreated()
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" >
      <ModalOverlay />
      <ModalContent bg={bg}>
        <ModalHeader mt={6}>ساخت تیکت جدید</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3} isRequired>
            <FormLabel>عنوان</FormLabel>
            <Input placeholder="مثلاً درخواست درگاه مستقیم" value={title} onChange={e => setTitle(e.target.value)} />
          </FormControl>
          <FormControl mb={3} isRequired>
            <FormLabel>توضیحات</FormLabel>
            <Textarea placeholder="لطفاً مشکل را توضیح دهید" value={desc} onChange={e => setDesc(e.target.value)} />
          </FormControl>
          <Box
            p={4} border="2px dashed" rounded="md" textAlign="center"
            onClick={() => document.getElementById('fileInput')?.click()}
            cursor="pointer"
          >
            {file ? file.name : 'ضمیمه\nدر صورت تمایل می‌توانید فایل ضمیمه کنید.'}
          </Box>
          <Input
            id="fileInput"
            type="file"
            display="none"
            onChange={e => setFile(e.target.files?.[0] || null)}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={2} my={3} mx={3}>لغو</Button>
          <Button colorScheme="teal" onClick={handleSubmit}>ساخت تیکت</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
