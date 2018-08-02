import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#00A843',
        contrastText: '#fff',
      },
      secondary: {
        main: '#f44336',
      },
    },
  });

class Signup extends Component {
    
    constructor () {
        super();
        this.state = {
            name: '', 
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)
        fetch('https://small-project-api.herokuapp.com/users', {
            method: 'POST',
            headers: {'Content-Type':'application/json', 'Host': 'example.org'},
            body: JSON.stringify({
                "email": this.state.email,
                "name": this.state.name,
                "password": this.state.password

            })
        })
        .then(res => res.json())
        .then(token => {
            // THIS ARE INVERTED IN THE BACKEND!!!!
            localStorage.setItem('token', token.jwt ) 
            localStorage.setItem('refresh', token.refresh_token )
            // Used to get gravatar
            localStorage.setItem('currentUser', this.state.email)
            localStorage.setItem('currentName', this.state.name)
            window.location.reload();
        })
    }
    
    render () {
        return (
            <div className="signup">
                <Typography variant="title" gutterBottom>
                    Sign Up
                </Typography>
                <br />
                <ValidatorForm onSubmit={this.handleSubmit}>
                <TextValidator fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    margin="normal"
                    value={this.state.name}
                    autoComplete='name'
                    onChange={this.handleInputChange}
                    validators={['required']}
                    errorMessages={['This field is required']}
                />
                <br />
                <TextValidator fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    margin="normal"
                    value={this.state.email}
                    autoComplete='email'
                    onChange={this.handleInputChange}
                    validators={['required', 'isEmail']}
                    errorMessages={['This field is required', 'Email is not valid']}
                />
                <br />
                <TextValidator fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    margin="normal"
                    value={this.state.password}
                    autoComplete='current-password'
                    onChange={this.handleInputChange}
                    validators={['required']}
                    errorMessages={['This field is required']}
                />
                <br />
                <br />
                
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                    <MuiThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" type="submit">
                            Sign Up
                        </Button>
                    </MuiThemeProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Typography variant="body1" gutterBottom>
                        Already have an account? <NavLink to="/login">Log In</NavLink>
                    </Typography>
                    </Grid>
                </Grid>
               </ValidatorForm>
                
            </div>
        )
    }
}

export default Signup;