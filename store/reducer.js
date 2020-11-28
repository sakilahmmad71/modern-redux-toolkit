import bugReducer, { bugAdded, bugResolved, bugRemoved } from './bugs'
import projectReducer, { projectAdded, projectRemoved } from './projects'
import userReducer, { userAdded, userRemoved } from './users'

const reducer = {
    users: userReducer,
    bugs: bugReducer,
    projects: projectReducer
}

export default reducer
