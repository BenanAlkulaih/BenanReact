import React, { Component } from 'react'
import Header from './Header'
import http from 'axios'

class CasePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
           caseId: this.props.history.location.state.caseId,
           custumerId:'',
           custumerName:'',
           AnsvarigId:'',
           AnsvarigName:'',
           Subject:'',
           Body:'',
           sdate:'',
           Status:''
        }
    }
    getAnsvarigName(uid){
        var config = {
            headers: { 'content-type': 'application/json',
                        'authorization': 'bearer ' + sessionStorage.getItem('jwt')}
        };
        http.get('http://localhost:3001/api/users/get/'+uid,config).then(res => {
            this.setState({ AnsvarigName: res.data.currentUser.firstname + " " +res.data.currentUser.lastname  })
        })
    }
    getcustomerName(uid){
        var config = {
            headers: { 'content-type': 'application/json',
                        'authorization': 'bearer ' + sessionStorage.getItem('jwt')}
        };
        http.get('http://localhost:3001/api/customers/'+uid,config).then(res => {
            this.setState({ custumerName: res.data.Name   })
        })
    }
    componentDidMount() {
        var config = {
            headers: { 'content-type': 'application/json',
                        'authorization': 'bearer ' + sessionStorage.getItem('jwt')}
        };
        http.get('http://localhost:3001/api/cases/'+this.state.caseId,config).then(res => { 
        this.setState({ custumerId: res.data.customer })
        this.getcustomerName(res.data.customer)
        this.setState({ AnsvarigId: res.data.skapadBy })
        this.getAnsvarigName(res.data.skapadBy)
        this.setState({ Subject: res.data.subject })
        this.setState({ Body: res.data.body })
        this.setState({ sdate: res.data.created })
        this.setState({ Status: res.data.status })
        }
        )
    }
    render() {
        console.log(this.state)
        return(
            <div>
                <Header user={JSON.parse(sessionStorage.getItem('user'))} logout={this.logout}/>
                <div className="container my-5" align="center">
                    <div className="card text-center ">
                    <h4 className="card-header"><i className="fas fa-id-card mr-3"></i>Ärende { this.state.Subject }</h4>
                    <div className="card-body">
                        <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="custumerName">Kund</label>
                            <input type="text" className="form-control disabled" disabled id="custumerName" placeholder="custumerName" value={ this.state.custumerName }  />        
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="Ansvarig">Ansvarig</label>
                            <input type="text" className="form-control disabled" disabled id="Ansvarig" placeholder="Ansvarig" value={ this.state.AnsvarigName }  />        
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="Status">Status</label>
                            <input type="text" className="form-control disabled" disabled id="Status" placeholder="Status" value={ this.state.Status }  />        
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" className="form-control disabled" disabled id="subject" placeholder="subject" value={ this.state.Subject }  />        
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="Skapad">Skapad</label>
                            <input type="text" className="form-control disabled" disabled id="Skapad" placeholder="Skapad" value={ this.state.sdate }  />        
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="Skapad">Meddelande</label>
                            <textarea type="text" className="form-control disabled" disabled id="Skapad" placeholder="Skapad" value={ this.state.Body }  />        
                        </div>
                        </div>
                        <hr/>
                    </div>
                    <div className="card-footer">
                    </div>
                    </div>
               </div>   
            </div>
            
        )
    }

}

export default CasePage