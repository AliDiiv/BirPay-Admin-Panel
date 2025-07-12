import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

type UserProfile = {
    email: string
    mobile: string
    name: string
    avatar: string
    documentUrl: string
}

type UserState = {
    profile: UserProfile | null
    isLoading: boolean
    isSaving: boolean
}

const initialState: UserState = {
    profile: null,
    isLoading: false,
    isSaving: false
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const res = await axios.get<UserProfile>('http://localhost:3000/userProfile')
    return res.data
})

export const saveUser = createAsyncThunk('user/saveUser', async (profile: UserProfile) => {
    const res = await axios.put<UserProfile>('http://localhost:3000/userProfile', profile)
    return res.data
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAvatar: (state, action) => {
            if (!state.profile) return
            state.profile = {
                ...state.profile,
                avatar: action.payload
            }
        },
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
            .addCase(fetchUser.pending, state => { state.isLoading = true })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.profile = action.payload
                state.isLoading = false
            })
            .addCase(fetchUser.rejected, state => { state.isLoading = false })

            .addCase(saveUser.pending, state => { state.isSaving = true })
            .addCase(saveUser.fulfilled, (state, action) => {
                state.profile = action.payload
                state.isSaving = false
            })
            .addCase(saveUser.rejected, state => { state.isSaving = false })
    }
})

export const { setAvatar, setDocument } = userSlice.actions
export default userSlice.reducer
