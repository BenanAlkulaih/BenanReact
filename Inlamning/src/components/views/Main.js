import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import CustomersList from './CustomersList'
import NewCustmer from './NewCustmer'
import CasesList from './CasesList'
import NewCase from './NewCase'
import CasePage from './CasePage'

class Main extends Component {


    render() {
        return(
            <main>
                <Switch>
                    <Route exact path='/' component={ Home } />
                    <Route path='/login' component={ Login } />
                    <Route path='/register' component={ Register } />
                    <Route path='/profile' component={ Profile } />
                    <Route path='/CustomersList' component={ CustomersList } />
                    <Route path='/NewCustmer' component={ NewCustmer } />
                    <Route path='/CasesList' component={ CasesList } />
                    <Route path='/NewCase' component={ NewCase } />
                    <Route path='/CasePage' component={ CasePage } />
                </Switch>
            </main>   
        )
    }

}

export default Main