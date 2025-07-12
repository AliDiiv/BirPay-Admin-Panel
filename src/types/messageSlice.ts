import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

// Define the Message type structure
export type Message = {
  id: string               // Unique ID for the message
  ticketId: string         // Associated ticket ID
  text: string             // Message text content
  from: 'client' | 'support' // Sender type
  createdAt: string        // Timestamp of message
  file?: string            // Optional file attachment URL
}

// Async thunk to fetch all messages for a specific ticket
export const fetchMessages = createAsyncThunk(
  'messages/fetch',
  async (ticketId: string) => {
    const res = await axios.get<Message[]>(
      `http://localhost:3000/messages?ticketId=${ticketId}`
    )
    return res.data // Return the array of messages
  }
)

// Async thunk to send a new message
export const sendMessage = createAsyncThunk(
  'messages/send',
  async (msg: Omit<Message, 'id'>) => {
    // Add a unique ID to the message before sending
    const newMsg = { ...msg, id: nanoid() }
    const res = await axios.post<Message>(
      'http://localhost:3000/messages',
      newMsg
    )
    return res.data // Return the created message
  }
)

// Create a Redux slice for managing messages
const messageSlice = createSlice({
  name: 'messages',
  // Initial state is an empty array of messages
  initialState: [] as Message[],

  // Synchronous reducers
  reducers: {
    // Clears all messages (e.g., when switching tickets)
    clearMessages: () => []
  },

  // Handle async actions using extraReducers
  extraReducers: builder => {
    builder
      // When messages are fetched, replace state with fetched messages
      .addCase(fetchMessages.fulfilled, (_, action) => action.payload)

      // When a message is sent, append it to the existing message list
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.push(action.payload)
      })
  }
})

// Export actions
export const { clearMessages } = messageSlice.actions

// Export reducer to be used in the Redux store
export default messageSlice.reducer
