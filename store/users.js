import { createSlice } from '@reduxjs/toolkit'

let lastIndex = 0

const usersInitialState = []

const users = createSlice({
    name: 'users',
    initialState: usersInitialState,
    reducers: {
        userAdded: (state, action) => {
            state.push({ id: ++lastIndex, name: action.payload.name })
        },

        userRemoved: (state, action) => {
            const index = state.findIndex(user => user.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        }
    }
})

export const { userAdded, userRemoved } = users.actions

export default users.reducer
