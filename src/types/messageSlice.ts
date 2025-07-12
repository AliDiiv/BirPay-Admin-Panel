import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

export type Message = {
  id: string
  ticketId: string
  text: string
  from: 'client' | 'support'
  createdAt: string
  file?: string
}

export const fetchMessages = createAsyncThunk(
  'messages/fetch',
  async (ticketId: string) => {
    const res = await axios.get<Message[]>(`http://localhost:3000/messages?ticketId=${ticketId}`)
    return res.data
  }
)

export const sendMessage = createAsyncThunk(
  'messages/send',
  async (msg: Omit<Message, 'id'>) => {
    const newMsg = { ...msg, id: nanoid() }
    const res = await axios.post<Message>('http://localhost:3000/messages', newMsg)
    return res.data
  }
)

const messageSlice = createSlice({
  name: 'messages',
  initialState: [] as Message[],
  reducers: {
    clearMessages: () => []
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMessages.fulfilled, (_, action) => action.payload)
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.push(action.payload)
      })
  }
})

export const { clearMessages } = messageSlice.actions
export default messageSlice.reducer
