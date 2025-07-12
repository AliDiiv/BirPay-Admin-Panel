import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Define the user profile structure
type UserProfile = {
  email: string         
  mobile: string        
  name: string          
  avatar: string        
  documentUrl: string   
}

// Define the shape of the user slice state
type UserState = {
  profile: UserProfile | null  
  isLoading: boolean           
  isSaving: boolean            
}

// Initial state of the user slice
const initialState: UserState = {
  profile: null,
  isLoading: false,
  isSaving: false
}

// Async thunk for fetching user profile data from API
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const res = await axios.get<UserProfile>('http://localhost:3000/userProfile')
    return res.data // Return the user profile data
  }
)

// Async thunk for saving (updating) user profile data
export const saveUser = createAsyncThunk(
  'user/saveUser',
  async (profile: UserProfile) => {
    const res = await axios.put<UserProfile>('http://localhost:3000/userProfile', profile)
    return res.data // Return the updated user profile data
  }
)

// Create the user slice with reducers and extraReducers to handle async thunks
const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    // Update the avatar URL in the user profile
    setAvatar: (state, action) => {
      if (!state.profile) return
      state.profile = {
        ...state.profile,
        avatar: action.payload
      }
    },

    // Update the document URL in the user profile
    setDocument: (state, action) => {
      if (!state.profile) return
      state.profile = {
        ...state.profile,
        documentUrl: action.payload
      }
    }
  },

  extraReducers: builder => {
    builder
      // Fetch user profile pending state: set isLoading to true
      .addCase(fetchUser.pending, state => {
        state.isLoading = true
      })

      // Fetch user profile fulfilled: store profile and reset loading state
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.profile = action.payload
        state.isLoading = false
      })

      // Fetch user profile rejected: reset loading state
      .addCase(fetchUser.rejected, state => {
        state.isLoading = false
      })

      // Save user profile pending: set isSaving to true
      .addCase(saveUser.pending, state => {
        state.isSaving = true
      })

      // Save user profile fulfilled: update profile and reset saving state
      .addCase(saveUser.fulfilled, (state, action) => {
        state.profile = action.payload
        state.isSaving = false
      })

      // Save user profile rejected: reset saving state
      .addCase(saveUser.rejected, state => {
        state.isSaving = false
      })
  }
})

// Export actions for updating avatar and document URLs
export const { setAvatar, setDocument } = userSlice.actions

// Export the reducer to include it in the Redux store
export default userSlice.reducer
