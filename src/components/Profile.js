import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


class Profile extends Component {

    constructor () {
        super();
        this.state = {
            name: 'Foo Bar',
            email: '',
            gravatarUrl: 'https://www.gravatar.com/avatar/b36aafe03e05a85031fd8c411b69f792?d=mm&s=64'
        }
    }

    componentWillMount() {

        const token = localStorage.getItem('token');

        fetch('https://small-project-api.herokuapp.com/me', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json', 
                'X-Access-Token': token,
                'Host': 'example.org'
            }
        })
        .then(res => res.json())
        .then(me => {
            /* Better trim the image sizes*/
            const betterUrl = me.avatar_url.substring(0, me.avatar_url.length - 3) + "64";

            this.setState({
                name: me.name,
                email: me.email,
                gravatarUrl: betterUrl
            })
        })

    }

    logOut() {
        const token = localStorage.getItem('token');
        fetch('https://small-project-api.herokuapp.com/access-tokens', {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'X-Access-Token': token,
                'Host': 'example.org'
            },
            body: JSON.stringify({
                "refresh_token": token
            })
        })
        .then(res => {
            console.log(res.status)
            if (res.status === 204) {
                localStorage.clear();
                window.location.reload();
            }
        })      
    }
 

    render () {

        return (      
            <div className="profile">
                <Divider light={true}/>
                <br />
                <img className="gravatar" alt="Avatar" src={this.state.gravatarUrl}/>
                <br />
                <Typography variant="body1" >
                    {this.state.name}
                </Typography>
                <Typography variant="caption" >
                    <a onClick={() => {this.logOut()}}>Log Out</a>
                </Typography>
            </div>

        )
    }
}

export default Profile;