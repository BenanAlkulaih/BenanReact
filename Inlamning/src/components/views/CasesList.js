import React, { Component } from 'react'
import http from 'axios'
import Header from './Header'
import { Redirect, Link } from 'react-router-dom'

class CasesList extends Component {
    constructor(props) {
        super(props)

        this.state = {
           Cases: [] 
        }
    }
    
    componentDidMount() {
        var config = {
            headers: { 'content-type': 'application/json',
                        'authorization': 'bearer ' + sessionStorage.getItem('jwt')}
        };
        http.get('http://localhost:3001/api/cases/all',config).then(res => this.setState({ Cases: res.data }))
    }

    caseStatus(status) {
        console.log(status)
        switch(status) {
          case '1':
            return <a className="btn btn-sm btn-warning">Ej påbörjad</a>;
          case '2':
                return <a className="btn btn-sm btn-primary">Pågående</a>;
          case '3':
                return <a className="btn btn-sm btn-success">Avslutad</a>;
          default:
            return "asd";
        }
      }

    
    render() {
       const CasesList = this.state.Cases.map( Case => (
            <tr key={Case._id}>
                <th scope="row"><Link 
                to={{
                    pathname: "/CasePage",
                    state: {
                        caseId: Case._id
                    }
                  }}
                 className="btn btn-sm btn-info"> {Case._id} </Link></th>
                <td>{Case.subject}</td>
                <td>{Case.created}</td>
                <td>
                { this.caseStatus(Case.status) }
                </td>
            </tr>
        ))

        return (
            <div>
            <Header user={JSON.parse(sessionStorage.getItem('user'))} logout={this.logout}/>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-6"> <h5><i className="fas fa-list mr-3"></i> ÄrendeList</h5></div>
                    <div className="col-6" align="right"> <Link to="/NewCase"><i className="fas fa-plus mr-3"></i>Nytt Ärende</Link></div>

                </div>
               

                <table className="table table-sm mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Subjekt</th>
                            <th scope="col">Skapad</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { CasesList }
                    </tbody>
                </table>
            </div>
            </div>
        )
    }
}

export default CasesList