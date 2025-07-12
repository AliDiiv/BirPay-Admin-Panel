import { configureStore } from '@reduxjs/toolkit'
import chartReducer from './chartSlice'
import txReducer from './txSlice'
import userReducer from './userSlice'
import ticketReducer from './ticketSlice'
import messageReducer from './messageSlice'

export const store = configureStore({
  reducer: {
    chart: chartReducer,
    transactions: txReducer,
    user: userReducer,
    tickets: ticketReducer,
    messages: messageReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
