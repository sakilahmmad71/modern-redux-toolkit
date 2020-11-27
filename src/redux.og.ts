import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { v1 as uuid } from 'uuid'
import { Todo } from './type'

// Constants
const CREATE_TODO = 'CREATE_TODO'
const EDIT_TODO = 'EDIT_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const DELETE_TODO = 'DELETE_TODO'
const SELECT_TODO = 'SELECT_TODO'

// ActionTypes and ActionCreators
interface CreateTodoActionType {
    type: typeof CREATE_TODO
    payload: Todo
}

export const createTodoActionCreator = (data: { desc: string }): CreateTodoActionType => {
    const { desc } = data
    return {
        type: CREATE_TODO,
        payload: {
            id: uuid(),
            desc,
            isComplete: false
        }
    }
}

interface EditTodoActionType {
    type: typeof EDIT_TODO
    payload: { id: string, desc: string }
}

export const editTodoActionCreator = (data: { id: string, desc: string }): EditTodoActionType => {
    const { id, desc } = data
    return {
        type: EDIT_TODO,
        payload: { id, desc }
    }
}

interface ToggleTodoActionType {
    type: typeof TOGGLE_TODO,
    payload: { id: string, isComplete: boolean }
}

export const toggleTodoActionCreator = (data: { id: string, isComplete: boolean }): ToggleTodoActionType => {
    const { id, isComplete } = data
    return {
        type: TOGGLE_TODO,
        payload: { id, isComplete }
    }
}

interface DeleteTodoActionType {
    type: typeof DELETE_TODO,
    payload: { id: string }
}

export const deleteTodoActionCreator = (data: { id: string }): DeleteTodoActionType => {
    const { id } = data
    return {
        type: DELETE_TODO,
        payload: { id }
    }
}

interface SelectTodoActionType {
    type: typeof SELECT_TODO,
    payload: { id: string }
}

export const selectTodoActionCreator = (data: { id: string }): SelectTodoActionType => {
    const { id } = data
    return {
        type: SELECT_TODO,
        payload: { id }
    }
}

// Reducers
type TodoActionTypes = CreateTodoActionType | EditTodoActionType | ToggleTodoActionType | DeleteTodoActionType

const todosInitialState: Todo[] = [
    { id: uuid(), desc: 'Learn Redux Toolkit', isComplete: false },
    { id: uuid(), desc: 'Learn Redux', isComplete: true },
    { id: uuid(), desc: 'Learn React', isComplete: false }
]

export const todosReducer = (state: Todo[] = todosInitialState, action: TodoActionTypes) => {
    switch (action.type) {
        case CREATE_TODO:
            return [ ...state, action.payload ]

        case EDIT_TODO:
            return state.map(todo => todo.id === action.payload.id ? { ...todo, desc: action.payload.desc } : todo)

        case TOGGLE_TODO:
            return state.map(todo => todo.id === action.payload.id ? { ...todo, isComplete: action.payload.isComplete } : todo)

        case DELETE_TODO:
            return state.filter(todo => todo.id !== action.payload.id)

        default:
            return state
    }
}

type SelectedTodoActionType = SelectTodoActionType

const selectedTodosInitialState = null

export const selectTodoReducer = (state: string | null = selectedTodosInitialState, action: SelectedTodoActionType) => {
    switch (action.type) {
        case SELECT_TODO:
            return action.payload.id

        default:
            return state
    }
}

const counterTodosInitialState = 0

export const counterTodoReducer = (state: number = counterTodosInitialState, action: TodoActionTypes) => {
    switch (action.type) {
        case CREATE_TODO:
            return state + 1

        case EDIT_TODO:
            return state + 1

        case TOGGLE_TODO:
            return state + 1

        case DELETE_TODO:
            return state + 1

        default:
            return state
    }
}

const reducers = combineReducers({
    todos: todosReducer,
    selectedTodo: selectTodoReducer,
    counter: counterTodoReducer
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, logger)))

export default store