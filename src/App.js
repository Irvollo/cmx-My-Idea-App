import React, { Component } from 'react';
import './App.css';
import { Route, HashRouter, Redirect } from "react-router-dom";
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import Authenticator from './helper/authenticator';


const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Authenticator.checkAuth() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    )
  )} />
)

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Authenticator.checkAuth() ? (
     <Redirect to={{ pathname: '/' }} />
    ) : (
      <Component {...props} />
    )
  )} />
)

const refreshAuth = () => {
  const refresh = localStorage.getItem('refresh');
  const headers  = {
      'Content-Type':'application/json',
      'Host': 'example.org'
  }
  const url = 'https://small-project-api.herokuapp.com/access-tokens/refresh'
  if (Authenticator.checkAuth()) {
    fetch(url , {
      method: 'POST',
      headers: headers,
      body: {
        "refresh_token": refresh
      }
    })
    .then((res) => {
      localStorage.setItem('token', res.body.jwt )
    })
  } 
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <HashRouter>
          <div className="content">
            <LoggedOutRoute path="/signup" component={Signup}/>
            <LoggedOutRoute path="/login" component={Login}/>
            <AuthRoute path="/" component={Home} />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
