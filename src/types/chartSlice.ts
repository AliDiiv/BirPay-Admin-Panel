import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Define the shape of the chart state
type ChartState = {
  data: { day: string; value: number }[]  
  isLoading: boolean                     
}

// Initial state of the chart slice
const initialState: ChartState = {
  data: [],
  isLoading: false
}

// Async thunk to fetch chart data from the server
export const fetchChart = createAsyncThunk(
  'chart/fetchChart', // Action type
  async (params: { gateway: string; period: string; type: string }) => {
    // Perform GET request with query parameters
    const res = await axios.get('http://localhost:3000/chartData', { params })
    return res.data  // Return the fetched data as the payload
  }
)

// Create the chart slice using Redux Toolkit
const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {}, // No synchronous reducers for now

  // Handle async actions in extraReducers
  extraReducers: (builder) => {
    builder
      // When fetchChart is pending, set loading to true
      .addCase(fetchChart.pending, state => {
        state.isLoading = true
      })
      // When fetchChart is fulfilled, store data and stop loading
      .addCase(fetchChart.fulfilled, (state, action) => {
        state.data = action.payload
        state.isLoading = false
      })
      // When fetchChart fails, stop loading
      .addCase(fetchChart.rejected, state => {
        state.isLoading = false
      })
  },
})

// Export the reducer to be included in the Redux store
export default chartSlice.reducer
