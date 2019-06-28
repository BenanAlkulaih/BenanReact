import React, { Component } from 'react'
import Header from './Header'
import NewCustomerForm from '../forms/NewCustomerForm'

class NewCustmer extends Component {


    render() {
        return(
            <div>
                <Header user={JSON.parse(sessionStorage.getItem('user'))} logout={this.logout}/>
                <div className="container my-5" align="center">
                <NewCustomerForm/>
                </div>   
            </div>
            
        )
    }

}

export default NewCustmer