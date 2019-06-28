import { combineReducers } from 'redux'
import authReducer from './authReducer'

const rootReducer = combineReducers({
    profile: authReducer
})

export default rootReducer