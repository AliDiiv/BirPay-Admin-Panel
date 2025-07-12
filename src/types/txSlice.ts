import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunk to fetch transaction data from the server
export const fetchTxs = createAsyncThunk(
  'tx/fetchTxs',
  async () => {
    const res = await axios.get('http://localhost:3000/transactions')
    return res.data // Return the fetched transaction list
  }
)

// Initial state for the transactions slice
const initialState = {
  data: [],         // List of transactions
  isLoading: false  // Loading indicator
}

// Create a Redux slice for managing transaction state
const txSlice = createSlice({
  name: 'transactions',     // Slice name
  initialState,             // Initial state
  reducers: {},             // No synchronous reducers

  // Handle async actions with extraReducers
  extraReducers: (builder) => {
    builder
      // While fetching, set loading to true
      .addCase(fetchTxs.pending, state => {
        state.isLoading = true
      })

      // On successful fetch, update the data and stop loading
      .addCase(fetchTxs.fulfilled, (state, action) => {
        state.data = action.payload
        state.isLoading = false
      })

      // On failure, stop loading but keep previous data
      .addCase(fetchTxs.rejected, state => {
        state.isLoading = false
      })
  }
})

// Export the reducer to include it in the Redux store
export default txSlice.reducer
