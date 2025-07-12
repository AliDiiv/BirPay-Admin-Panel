import { HStack, Input, IconButton, useToast } from '@chakra-ui/react'
import { FiPaperclip, FiSend } from 'react-icons/fi'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../types/store'
import { sendMessage } from '../../types/messageSlice'

export default function MessageInput({ ticketId }: { ticketId: string }) {
  const [text, setText] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const toast = useToast()

  const handleSend = async () => {
    if (!text && !file) {
      toast({ title: 'متنی یا فایلی وارد کنید.',
         status: 'warning' })
      return
    }

    const msg = {
      ticketId,
      text,
      from: 'client',
      createdAt: new Date().toISOString(),
      file: ''
    }

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        dispatch(sendMessage({ ...msg, file: reader.result as string }))
        setText('')
        setFile(null)
      }
      reader.readAsDataURL(file)
    } else {
      dispatch(sendMessage(msg))
      setText('')
    }
  }

  return (
    <HStack p={4} spacing={2} >
      <IconButton icon={<FiPaperclip />} aria-label="ضمیمه" onClick={() => document.getElementById('msgFile')?.click()} />
      <Input id="msgFile" type="file" display="none" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <Input flex="1" placeholder="متن پیام خود را وارد کنید…" value={text} onChange={(e) => setText(e.target.value)} />
      <IconButton icon={<FiSend />} colorScheme="teal" _hover={{ borderColor: 'teal.400' }} aria-label="ارسال" onClick={handleSend} />
    </HStack>
  )
}
