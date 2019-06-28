import React, { Component } from 'react'
import http from 'axios'
import { Redirect } from 'react-router-dom'

class NewCaseForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customer: '',
            subject: '',
            body: '',
            createdBy:sessionStorage.getItem('_uid'),
            isSaved: false,
            customers: []
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {
        var config = {
            headers: { 'content-type': 'application/json',
                        'authorization': 'bearer ' + sessionStorage.getItem('jwt')}
        };
        http.get('http://localhost:3001/api/customers/all',config).then(res => this.setState({ customers: res.data }))
    }
    
    onChange(e) { this.setState({ [e.target.id] : e.target.value })}
    onSubmit(e) {
        e.preventDefault()
        var config = {
            headers: { 'content-type': 'application/json',
                        'authorization': 'bearer ' + sessionStorage.getItem('jwt')}
        };
        http.post('http://localhost:3001/api/cases/', this.state,config)
        .then(() => {
            this.setState({ customer: '' })
            this.setState({ subject: '' })
            this.setState({ body: '' })
            this.setState({ createdBy: sessionStorage.getItem('_uid') })
            this.setState({ isSaved: true })
        })
    }


    render() {
        var forNam="Företag:";
        const customerList = this.state.customers.map( customerL => (
           <option key={customerL._id} value={customerL._id}>{customerL.firstname} {customerL.lastame} {forNam} {customerL.Name}</option>
        ))
        var textareaStyle={
            resize: 'none'
        }
        const { customer, subject, body, isSaved} = this.state
        if(isSaved == true) return <Redirect to='/CustomersList' /> 
        return (
               <div className="card text-center ">
                    <form className="my-4" onSubmit={this.onSubmit}>
                        <h5 className="card-header"><i className="fas fa-id-card mr-3"></i> Skapa Ärende</h5>
                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="customer">Kund</label>
                                    <select className="form-control" id="customer" placeholder="Förnamn" value={customer} onChange={this.onChange}>
                                        <option value="">Välj Kund</option>
                                        {customerList}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="subject">Ämne</label>
                                    <input type="text" className="form-control" id="subject" placeholder="Ämne" value={subject} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="body">beskrivning</label>
                                    <textarea className="form-control" id="body" placeholder="beskrivning" rows="10" cols="50" style={textareaStyle} value={body}  onChange={this.onChange}/>
                                </div>
                            </div>
                         </div>  
                            <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Skapa Ärende</button>
                            </div>
                        
                    </form>
                </div>
        )
    }
}

export default NewCaseForm