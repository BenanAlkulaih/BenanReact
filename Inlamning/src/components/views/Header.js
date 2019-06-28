import React, { Component } from 'react'
import Navigation from './Navigation'


class Header extends Component {

    render() {
        console.log(this.props)
        return(
            <header>
                <Navigation user={this.props.user} logout={ this.props.logout}/>
            </header>   
        )
    }

}

export default Header