import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

export type Ticket = {
  id: string
  title: string
  desc: string
  createdAt: string
  file?: string
}

export const fetchTickets = createAsyncThunk('tickets/fetch', async () => {
  const res = await axios.get<Ticket[]>('http://localhost:3000/tickets')
  return res.data
})

export const createTicket = createAsyncThunk('tickets/create', async (ticket: Omit<Ticket, 'id'>) => {
  const res = await axios.post('http://localhost:3000/tickets', { id: nanoid(), ...ticket })
  return res.data
})

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: [] as Ticket[],
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTickets.fulfilled, (_, action) => action.payload)
      .addCase(createTicket.fulfilled, (state, action) => {
        state.push(action.payload)
      })
  }
})

export default ticketSlice.reducer
