import React, { Component } from 'react'
import Header from './Header'
import NewCaseForm from '../forms/NewCaseForm'

class NewCase extends Component {


    render() {
        return(
            <div>
                <Header user={JSON.parse(sessionStorage.getItem('user'))} logout={this.logout}/>
                <div className="container my-5" align="center">
                <NewCaseForm/>
                </div>   
            </div>
            
        )
    }

}

export default NewCase