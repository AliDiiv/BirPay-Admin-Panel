import { configureStore } from '@reduxjs/toolkit'
import chartReducer from './chartSlice'
import txReducer from './txSlice'
import userReducer from './userSlice'
import ticketReducer from './ticketSlice'
import messageReducer from './messageSlice'

// Create and configure the Redux store with all the slices
export const store = configureStore({
  reducer: {
    chart: chartReducer,         // Handles chart-related data
    transactions: txReducer,     // Handles transaction data
    user: userReducer,           // Handles user information and auth
    tickets: ticketReducer,      // Handles support tickets
    messages: messageReducer     // Handles messages related to tickets
  }
})

// Type for the entire Redux state tree
export type RootState = ReturnType<typeof store.getState>

// Type for the dispatch function, useful for typing with useDispatch
export type AppDispatch = typeof store.dispatch
