import React, { Component } from 'react'
import http from 'axios'
import { Redirect } from 'react-router-dom'

class NewCustomerForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstname: '',
            lastname: '',
            Name: '',
            address: '',
            Zipcode: '',
            City: '',
            Email: '',
            Tele: '',
            isSaved: false
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    onChange(e) { this.setState({ [e.target.id] : e.target.value })}
    onSubmit(e) {
        e.preventDefault()
        var config = {
            headers: { 'content-type': 'application/json',
                        'authorization': 'bearer ' + sessionStorage.getItem('jwt')}
        };
        http.post('http://localhost:3001/api/customers/', this.state,config)
        .then(() => {
            this.setState({ firstname: '' })
            this.setState({ lastname: '' })
            this.setState({ Name: '' })
            this.setState({ address: '' })
            this.setState({ Zipcode: '' })
            this.setState({ City: '' })
            this.setState({ Email: '' })
            this.setState({ Tele: '' })
            this.setState({ isSaved: true })
        })
    }


    render() {
        const { firstname, Name, lastname, address, Zipcode, City, Email, Tele, isSaved} = this.state
        if(isSaved == true) return <Redirect to='/CustomersList' /> 
        return (
               <div className="card text-center ">
                    <form className="my-4" onSubmit={this.onSubmit}>
                        <h5 className="card-header"><i className="fas fa-id-card mr-3"></i> Skapa Kund</h5>
                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label for="firstname">Förnamn</label>
                                    <input type="text" className="form-control" id="firstname" placeholder="Förnamn" value={firstname} onChange={this.onChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label for="lastname">Efternamn</label>
                                    <input type="text" className="form-control" id="lastname" placeholder="Efternamn" value={lastname} onChange={this.onChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label for="Name">Företagsnamn</label>
                                    <input type="text" className="form-control" id="Name" placeholder="Företagsnamn" value={Name} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label for="address">Adress</label>
                                    <input type="text" className="form-control" id="address" placeholder="Adress" value={address} onChange={this.onChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label for="adZipcoderess">postnummer</label>
                                    <input type="text" className="form-control" id="Zipcode" placeholder="postnummer" value={Zipcode} onChange={this.onChange} />
                                </div>
                                <div className="form-group col-md-8">
                                    <label for="City">Ort</label>
                                    <input type="text" className="form-control" id="City" placeholder="ort" value={City} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="Email">E-postadress</label>
                                    <input type="email" className="form-control" id="Email" placeholder="Name" value={Email} onChange={this.onChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="Tele">telefonnummer</label>
                                    <input type="text" className="form-control" id="Tele" placeholder="telefonnummer" value={Tele} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Skapa Kund</button>
                                </div>
                        </div>

                    </form>
                </div>
        )
    }
}

export default NewCustomerForm