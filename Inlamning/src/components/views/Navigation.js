import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'

class Navigation extends Component {
   
    render() {
        console.log(this.props)
      // if(!this.props.user)return<Redirect to="/login" /> 
       var UserName= this.props.user.firstname + " " + this.props.user.lastname;
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <div id="navbarNav" className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink exact to="/" activeClassName="active" className="nav-link">Hem</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact to="/profile" activeClassName="active" className="nav-link">Profile</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact to="/CustomersList" activeClassName="active" className="nav-link">Kunder</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact to="/CasesList" activeClassName="active" className="nav-link">Ärende</NavLink>
                            </li>
                            </ul>
                        <ul className="navbar-nav">
                        <li className="nav-item">
                                <NavLink exact to="/profile" activeClassName="active" className="nav-link">{ UserName }</NavLink>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                onClick={this.props.logout}>Logga ut</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        )
    }

}

//export default connect(mapStateToProps, mapDispatchToProps) (Navigation)
export default Navigation