import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

// Define the Ticket type
export type Ticket = {
  id: string           
  title: string        
  desc: string         
  createdAt: string    
  file?: string      
}

// Async thunk to fetch all tickets from the server
export const fetchTickets = createAsyncThunk(
  'tickets/fetch',
  async () => {
    const res = await axios.get<Ticket[]>('http://localhost:3000/tickets')
    return res.data // Return the fetched ticket array
  }
)

// Async thunk to create a new ticket
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticket: Omit<Ticket, 'id'>) => {
    // Add a unique ID to the ticket before sending it
    const res = await axios.post('http://localhost:3000/tickets', {
      id: nanoid(),
      ...ticket
    })
    return res.data // Return the created ticket object
  }
)

// Create the Redux slice for ticket state management
const ticketSlice = createSlice({
  name: 'tickets',
  initialState: [] as Ticket[], // Start with an empty list of tickets

  reducers: {}, // No synchronous reducers

  // Handle async actions in extraReducers
  extraReducers: builder => {
    // When fetchTickets succeeds, replace the state with the fetched data
    builder.addCase(fetchTickets.fulfilled, (_, action) => action.payload)

    // When createTicket succeeds, append the new ticket to the existing state
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.push(action.payload)
    })
  }
})

// Export the reducer to be used in the Redux store
export default ticketSlice.reducer
