import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { login } from '../../store/actions/authActions'
import LoginForm from '../forms/LoginForm'

const mapStateToProps = (state) => {
    return {
        authError: state.profile.authError,
        token: state.profile.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials) => dispatch(login(credentials))
    }
}

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            cred: {
                email: '',
                password: ''
            }
        }
    }

    onChange = (e) => {
       const credentials = this.state.cred
       credentials[e.target.id] = e.target.value
       return this.setState({ cred: credentials })
    }
    
    onSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.cred)
        this.props.login(this.state.cred)
        //console.log(sessionStorage.getItem('jwt'))
    }


    render() {
        
        const { authError, token } = this.props;
      //  console.log(token)
        if(sessionStorage.getItem('jwt')!==null ) return <Redirect to='/' />
        var authErrorClass;
        if (authError) {
            authErrorClass= "alert-danger";
        } 
        return(
            <div className="container mt-5" align="center">
                <div className={`alert ${authErrorClass}`} role="alert">{ authError}</div> 
                <LoginForm cred={this.state.cred} onSubmit={this.onSubmit} onChange={this.onChange} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)