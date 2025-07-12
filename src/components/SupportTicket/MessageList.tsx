import { VStack, Box, Text, useColorModeValue, Flex } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../types/store'
import { fetchMessages, clearMessages } from '../../types/messageSlice'
import MessageInput from './MessageInput'

export default function MessageList({ ticketId }: { ticketId: string }) {
  const dispatch = useDispatch<AppDispatch>()
  const messages = useSelector((state: RootState) => state.messages)
  const bg = useColorModeValue('white', '#021726')
  const bgbox = useColorModeValue('#EEF2F5', '#092030')



  useEffect(() => {
    dispatch(clearMessages())
    dispatch(fetchMessages(ticketId))
  }, [ticketId])

  return (
    <Flex
      direction="column"
      justify="space-between"
      bg={bg}
      p={{ base: 2, md: 4 }}
      borderRadius="lg"
      boxShadow="md"
      h="100%"
      w="100%"
      maxH="calc(100vh - 150px)"
    >
      {/* Messages*/}
      <VStack
        spacing={4}
        align="stretch"
        overflowY="auto"
        flex="1"
        pr={2}
        sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {messages.map((m) => (
          <Box
            key={m.id}
            alignSelf={m.from === 'support' ? 'flex-end' : 'flex-start'}
            maxW={{ base: '85%', md: '70%' }}
          >
            <Box
              p={3}
              bg={bgbox}
              borderRadius="md"
            >
              <Text fontSize="sm" whiteSpace="pre-wrap">{m.text}</Text>
              {m.file && (
                <a href={m.file} target="_blank" rel="noreferrer">
                  <Text fontSize="xs" mt={2} color="blue.600">📎 فایل ضمیمه</Text>
                </a>
              )}
            </Box>
            <Text fontSize="xs" color="gray.500" textAlign="right">
              {m.from} {new Date(m.createdAt).toLocaleString()}
            </Text>
          </Box>
        ))}
      </VStack>

      {/* Input Message */}
      <Box pt={4}>
        <MessageInput ticketId={ticketId} />
      </Box>
    </Flex>
  )
}
