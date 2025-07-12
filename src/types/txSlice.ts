import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchTxs = createAsyncThunk('tx/fetchTxs', async () => {
  const res = await axios.get('http://localhost:3000/transactions')
  return res.data
})

const initialState = {
  data: [],
  isLoading: false
}

const txSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTxs.pending, state => { state.isLoading = true })
      .addCase(fetchTxs.fulfilled, (state, action) => {
        state.data = action.payload
        state.isLoading = false
      })
      .addCase(fetchTxs.rejected, state => { state.isLoading = false })
  }
})

export default txSlice.reducer
