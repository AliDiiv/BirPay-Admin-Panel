import {
  Box, Flex, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton,
  useColorModeValue, HStack, Text, Button
} from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'
import { useState } from 'react'

import Header from '../../components/Dashboard/DashboardHeader'
import Sidebar from '../../components/Dashboard/SidebarMenu'
import TicketList from '../../components/SupportTicket/TicketList'
import MessageList from '../../components/SupportTicket/MessageList'
import TicketModal from '../../components/SupportTicket/TicketModal'

export default function Support() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)
  const [refreshList, setRefreshList] = useState(false)

  const bg = useColorModeValue('#EFF2F5', '#092030')
  const bgDrawer = useColorModeValue('white', '#021726')

  const ticketModal = useDisclosure()

  const handleTicketCreated = (newId: string) => {
    setRefreshList(!refreshList)
    setSelectedTicketId(newId)
    ticketModal.onClose()
  }

  return (
    <Flex flex="1" direction="column" h="100vh" bg={bg}>
      <Header onOpenSidebar={onOpen} />

      <Flex flex="1" direction={{ base: 'column', md: 'row-reverse' }} overflow="hidden">
        {/* محتوای اصلی */}
        <Flex flex="3" direction="column" p={4} gap={4} overflow="hidden">
          <Text fontSize="xl" fontWeight="bold">تیکت‌های پشتیبانی</Text>

          <Flex gap={4} flex="1" direction={{ base: 'column', md: 'row' }} overflow="hidden">
            <Box w={{ base: '100%', md: '300px' }} overflowY="auto">
              <TicketList
                onSelect={(id) => setSelectedTicketId(id)}
                refresh={refreshList}
              />
              <Flex justify="space-between" align="center" mt="3">
                <Button onClick={ticketModal.onOpen} colorScheme="teal">+ ساخت تیکت جدید</Button>
              </Flex>
            </Box>

            <Box flex="1" minH="300px" overflow="hidden">
              {selectedTicketId ? (
                <MessageList ticketId={selectedTicketId} />
              ) : (
                <Box p={6} textAlign="center" color="gray.500">یک تیکت را انتخاب کنید یا تیکت جدید بسازید.</Box>
              )}
            </Box>
          </Flex>
        </Flex>

        {/* سایدبار دسکتاپ */}
        <Box display={{ base: 'none', md: 'block' }}>
          <Sidebar />
        </Box>
      </Flex>

      {/* Drawer موبایل */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bgDrawer}>
          <DrawerCloseButton />
          <Box p={4} pt={10}>
            <Sidebar />
          </Box>
        </DrawerContent>
      </Drawer>

      {/* Footer */}
      <HStack spacing={2} justify="center">
        <Text>۱۴۰۴</Text>
        <FaHeart color="red" />
        <Text>بیر پی</Text>
      </HStack>
      <Text fontSize="xs" mt={2} align="center">علی محمد جعفری </Text>
      <Text fontSize="xs" mt={2} align="center">v1.1 </Text>
      {/* مودال ساخت تیکت */}
      <TicketModal
        isOpen={ticketModal.isOpen}
        onClose={ticketModal.onClose}
        onCreated={(ticket) => handleTicketCreated(ticket.id)}
      />
    </Flex>
  )
}
