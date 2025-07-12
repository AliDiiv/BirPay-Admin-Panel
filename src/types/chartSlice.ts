import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

type ChartState = {
  data: { day: string; value: number }[]
  isLoading: boolean
}

const initialState: ChartState = { data: [], isLoading: false }

export const fetchChart = createAsyncThunk(
  'chart/fetchChart',
  async (params: { gateway: string; period: string; type: string }) => {
    const res = await axios.get('http://localhost:3000/chartData', { params })
    return res.data
  }
)

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChart.pending, state => { state.isLoading = true })
      .addCase(fetchChart.fulfilled, (state, action) => {
        state.data = action.payload
        state.isLoading = false
      })
      .addCase(fetchChart.rejected, state => { state.isLoading = false })
  },
})

export default chartSlice.reducer
