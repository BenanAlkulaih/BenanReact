import actiontypes from './actiontypes'

const apiurl = 'http://localhost:3001/api/users'

export const register = (credentials) => dispatch => {

    fetch(apiurl + '/register', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(res => res.json())
    .then(res => {

        console.log(res)

        if(res.success) {
            dispatch({
                type: actiontypes.REGISTER_SUCCESS,
                success: res.success 
            })

            sessionStorage.setItem('token', res.token)

        } else {
            dispatch({
                type: actiontypes.REGISTER_ERROR
            })            
        }
    })
  
}

export const login = (credentials) => dispatch => {

    fetch(`${apiurl}/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        if(res.success) {
            dispatch({
                type: actiontypes.LOGIN_SUCCESS,
                payload: res.token 
            })
            
            sessionStorage.setItem('jwt', res.token)
            sessionStorage.setItem('_uid', res.currentUser._id)
            console.log(JSON.stringify(res.currentUser))
            sessionStorage.setItem('user', JSON.stringify(res.currentUser))
           
        } else {
            dispatch({
                type: actiontypes.LOGIN_ERROR
            })            
        }
        
    })
    .catch(() => {
        dispatch({
            type: actiontypes.LOGIN_FATAL_ERROR
        })       
    })
}

export const logout = () => dispatch => {

    dispatch({
        type: actiontypes.LOGOUT_SUCCESS
    })

    sessionStorage.removeItem('jwt')
    sessionStorage.removeItem('user')

}

export const get = (_id,token) => dispatch => {
    console.log(_id)
    console.log(token)
/*    dispatch({
        type: actiontypes.GET_PROFILE_SUCCESS,
        user: JSON.parse(sessionStorage.getItem('user'))
    })
    */
    fetch(`${apiurl}/get/${_id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': 'bearer ' + token
        }
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        dispatch({
            type: actiontypes.GET_PROFILE_SUCCESS,
            user: res.currentUser
        })

        sessionStorage.setItem('user', JSON.stringify(res.currentUser))
    })       

}

export const update = (user, jwt) => dispatch => {
 
    fetch(`${apiurl}/${user._id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'authorization': 'bearer ' + jwt
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(res => {
        
        sessionStorage.setItem('user', JSON.stringify(res.currentUser))

        dispatch({
            type: actiontypes.UPDATE_PROFILE_SUCCESS,
            user: JSON.parse(sessionStorage.getItem('user'))
        })

        
    })       

}

