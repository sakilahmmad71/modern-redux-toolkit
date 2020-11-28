import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUsers = createAsyncThunk('users/fetchUser', async () => {
    const response = await axios.get('/api/users')
    return response.data.users
})

const usersInitialState = {
    users: [],
    status: 'idle',
    error: null
}

const users = createSlice({
    name: 'users',
    initialState: usersInitialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.pending]: (state, action) => {
            state.status = 'loading'
        },

        [fetchUsers.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.users.push(...action.payload)
        },

        [fetchUsers.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})