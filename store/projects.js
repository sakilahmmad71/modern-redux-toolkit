import { createSlice } from '@reduxjs/toolkit'

let lastIndex = 0
const projectsInitialState = []

const projects = createSlice({
    name: 'projects',
    initialState: projectsInitialState,
    reducers: {
        projectAdded: (state, action) => {
            state.push({ id: ++lastIndex, project: action.payload.project })
        },

        projectRemoved: (state, action) => {
            const index = state.findIndex(project => project.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        },
    }
})

export const { projectAdded, projectRemoved } = projects.actions

export default projects.reducer