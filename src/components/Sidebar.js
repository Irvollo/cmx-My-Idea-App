import React, {Component} from 'react';
import Authenticator from '../helper/authenticator';
import Profile from './Profile'

class Sidebar extends Component {


    render () {

        return (
            <div className="sidenav">
                <a href="#home"><img alt="Logo" src={require('../assets/IdeaPool_icon.png')} /></a>
                <p>The Idea Pool</p>
                
                { Authenticator.checkAuth() && 
                    <Profile />
                }
                
            </div>
        )
    }
}

export default Sidebar;