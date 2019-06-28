
import actiontypes from '../actions/actiontypes';

const initialState = {
    user: {},
    loggedIn: false,
    authError: null,
    token: null
}

const authReducer = (state = initialState, action) => {
        
    switch(action.type) {

        case actiontypes.REGISTER_ERROR:
            console.log('register error')
            return {
                ...state,
                authError: 'register failed',
                loggedIn: false
            }

        case actiontypes.REGISTER_SUCCESS:
            console.log('register success')
            return {
                ...state,
                authError: null,
                regsuccess: action.success
            }

            case actiontypes.LOGIN_ERROR:
                console.log('login error')
                return {
                    ...state,
                    authError: 'Login failed',
                    token: null
                }
            case actiontypes.LOGIN_FATAL_ERROR:
                console.log('login fatal error')
                return {
                    ...state,
                    authError: 'Login fatal failed',
                    token: null
                }   

        case actiontypes.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                loggedIn: action.loggedIn,
                token: action.payload
            }

        

        case actiontypes.GET_PROFILE_SUCCESS:
            return {
                ...state,
                user: action.user,
                loggedIn: action.loggedIn,
                token: action.payload
            }

        case actiontypes.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                user: action.user
            }
        
        default:
            return {
                ...state
            }
    }
}

export default authReducer