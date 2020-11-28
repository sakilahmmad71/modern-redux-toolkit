import { createSlice, createSelector } from '@reduxjs/toolkit'

let lastIndex = 0
const bugsInitialState = []

const bugs = createSlice({
    name: 'bugs',
    initialState: bugsInitialState,
    reducers: {
        bugAdded: (state, action) => {
            state.push({ id: ++lastIndex, desc: action.payload.desc, isResolve: false })
        },

        bugResolved: (state, action) => {
            const bug = state.find(bug => bug.id === action.payload.id)
            if (bug) {
                bug.isResolve = true
            }
        },

        bugRemoved: (state, action) => {
            const index = state.findIndex(bug => bug.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        },

        bugAssignedToUser: (state, action) => {
            const index = state.findIndex(bug => bug.id === action.payload.id)
            if (index !== -1) {
                state[index].userId = action.payload.userId
            }
        }
    }
})

export const { bugAdded, bugResolved, bugRemoved, bugAssignedToUser } = bugs.actions

export default bugs.reducer

// Memoizing assigned user
export const getAssignedUser = (userId) => createSelector(state => state.bugs, bugs => bugs.filter(bug => bug.userId === userId))