import React, { Component } from 'react'
import RegisterForm from '../forms/RegisterForm'

class Register extends Component {


    render() {
        return(
            <div className="container my-5" align="center">
                <RegisterForm />
            </div>   
        )
    }

}

export default Register