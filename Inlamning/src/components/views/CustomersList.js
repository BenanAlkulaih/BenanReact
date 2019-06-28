import React, { Component } from 'react'
import http from 'axios'
import Header from './Header'
import { Redirect, Link } from 'react-router-dom'

class CustomerList extends Component {
    constructor(props) {
        super(props)

        this.state = {
           customers: [] 
        }
    }
    
    componentDidMount() {
        var config = {
            headers: { 'content-type': 'application/json',
                        'authorization': 'bearer ' + sessionStorage.getItem('jwt')}
        };
        http.get('http://localhost:3001/api/customers/all',config).then(res => this.setState({ customers: res.data }))
    }

    
    render() {

        const customerList = this.state.customers.map( customer => (
            <tr key={customer._id}>
                <th scope="row">{customer._id}</th>
                <td>{customer.firstname} {customer.lastname}</td>
                <td>{customer.Name}</td>
                <td>{customer.address} {customer.Zipcode} {customer.City} </td>
                <td>{customer.Email}</td>
                <td>{customer.Tele}</td>
            </tr>
        ))

        return (
            <div>
            <Header user={JSON.parse(sessionStorage.getItem('user'))} logout={this.logout}/>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-6"> <h5><i className="fas fa-list mr-3"></i> Kundlista</h5></div>
                    <div className="col-6" align="right"> <Link to="/NewCustmer"><i className="fas fa-plus mr-3"></i>Ny kund</Link></div>

                </div>
               

                <table className="table table-sm mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Kontaktperson</th>
                            <th scope="col">Företagsnamn</th>
                            <th scope="col">Adress</th>
                            <th scope="col">E-post</th>
                            <th scope="col">Telefoni</th>
                        </tr>
                    </thead>
                    <tbody>
                        { customerList }
                    </tbody>
                </table>
            </div>
            </div>
        )
    }
}

export default CustomerList