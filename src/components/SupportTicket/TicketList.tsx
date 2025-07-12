import { VStack, Box, Text, HStack, useColorModeValue } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import TicketModal from './TicketModal'
import dayjs from 'dayjs'


type Ticket = { id: string, title: string, createdAt: string }


export default function TicketList({ onSelect }: { onSelect: (id: number) => void }) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const { isOpen, onOpen, onClose } = TicketModal.useDisclosure
    ? TicketModal.useDisclosure()
    : { isOpen: false, onOpen: () => { }, onClose: () => { } }

  useEffect(() => {
    axios.get('http://localhost:3000/tickets').then(res => setTickets(res.data))
  }, [])

  const refresh = () => axios.get('http://localhost:3000/tickets').then(res => setTickets(res.data))

  return (
    <VStack spacing={4} align="stretch">
      <TicketModal isOpen={isOpen} onClose={onClose} onCreated={refresh} />
      {tickets.map(t => (
        <Box key={t.id} p={3} bg={useColorModeValue('white', '#031626')} rounded="md" cursor="pointer" onClick={() => onSelect(t.id)}>
          <HStack spacing={2}>
            <Text fontWeight="bold">{t.title}</Text>
            <Text fontSize="sm" color="gray.500">{dayjs(t.createdAt).format('YYYY/MM/DD HH:mm')}</Text>
          </HStack>
        </Box>
      ))}
    </VStack>
  )
}
