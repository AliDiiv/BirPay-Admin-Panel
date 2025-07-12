import {
  Flex, IconButton, useColorMode, useColorModeValue, HStack, Menu, MenuButton,
  MenuList, MenuItem, Image, Button, Spinner, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Text
} from '@chakra-ui/react'
import { FiMenu, FiSun, FiMoon } from 'react-icons/fi'
import { BellIcon, InfoIcon, ChevronDownIcon } from '@chakra-ui/icons'
import logo from '../../assets/BirPayLogo.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TicketModal from '../../components/SupportTicket/TicketModal'

export default function Header({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const ticketModal = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue('white', '#021726')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const [isLoginOut, setIsLoginOut] = useState(false)
  const navigate = useNavigate()

  const notifModal = useDisclosure()
  const helpModal = useDisclosure()

  const handleLogout = async () => {
    setIsLoginOut(true)
    setTimeout(() => navigate('/login'), 1000)
  }

  return (
    <>
      <Flex
        w="100%"
        px={4}
        py={3}
        bg={bg}
        borderBottom="1px solid"
        borderColor={borderColor}
        align="center"
        justify="space-between"
      >
        {/* Logo & Sidebar */}
        <HStack spacing={2}>
          <IconButton
            display={{ base: 'inline-flex', md: 'none' }}
            icon={<FiMenu />}
            aria-label="باز کردن منو"
            onClick={onOpenSidebar}
            variant="ghost"
          />
          <Image src={logo} alt="Bir Pay logo" height="30px" mx={3} display={{ base: 'none', md: 'inline' }} />
        </HStack>

        {/* Actions */}
        <HStack spacing={3}>
          <IconButton aria-label="Notification" icon={<BellIcon />} variant="ghost" onClick={notifModal.onOpen} />
          <IconButton aria-label="Help" icon={<InfoIcon />} variant="ghost" onClick={helpModal.onOpen} />
          <IconButton
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            aria-label="toggle theme"
            variant="ghost"
          />
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              borderColor="blue.400"
              borderRadius="full"
              px={4}
            >
              علی محمد جعفری
            </MenuButton>
            <MenuList>
              <MenuItem>پروفایل</MenuItem>
              <MenuItem>تنظیمات</MenuItem>
              <MenuItem onClick={handleLogout} isDisabled={isLoginOut}>
                {isLoginOut ? (
                  <>
                    <Spinner size="sm" ml={2} />
                    در حال خروج...
                  </>
                ) : (
                  'خروج'
                )}
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Notification Modal */}
      <Modal isOpen={notifModal.isOpen} onClose={notifModal.onClose}>
        <ModalOverlay />
        <ModalContent bg={bg}>
          <ModalHeader mt={6}>اعلان‌ها</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>📌 هنوز هیچ اعلانی وجود ندارد.</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={notifModal.onClose}>بستن</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/*Help Modal */}
      <Modal isOpen={helpModal.isOpen} onClose={helpModal.onClose}>
        <ModalOverlay />
        <ModalContent bg={bg}>
          <ModalHeader mt={6}>راهنما و پشتیبانی</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>برای دریافت راهنمایی با پشتیبانی تماس بگیرید یا یک تیکت ثبت کنید.</Text>
            <Text fontSize="sm" color="gray.500">📞 021-00000000</Text>
            <Text fontSize="sm" color="gray.500">📧 support@birpay.ir</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={helpModal.onClose}>باشه</Button>
            <Flex justify="space-between" align="center" mx={3}>
              <Button onClick={ticketModal.onOpen} colorScheme="teal">+ تیکت جدید</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <TicketModal
        isOpen={ticketModal.isOpen}
        onClose={ticketModal.onClose}
        onCreated={() => { }}
      />

    </>
  )
}
