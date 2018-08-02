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

class Login extends Component {
    
    constructor () {
        super();
        this.state = {
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // Log In
    handleSubmit(event) {
        event.preventDefault();
        fetch('https://small-project-api.herokuapp.com/access-tokens', {
            method: 'POST',
            headers: {'Content-Type':'application/json', 'Host': 'example.org'},
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password

            })
        })
        .then(res => res.json())
        .then(token => {
            // THIS ARE INVERTED IN THE BACKEND!!!!
            localStorage.setItem('token', token.jwt ) 
            localStorage.setItem('refresh', token.refresh_token )
            window.location.reload();
        })

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    render () {
        return (
            <div className="signup">
                <Typography variant="title" gutterBottom>
                    Log In
                </Typography>
                <br />
                <ValidatorForm onSubmit={this.handleSubmit}>
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
                            Log In
                        </Button>
                    </MuiThemeProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Typography variant="body1" gutterBottom>
                        Don't have an account? <NavLink to="/signup">Create an account</NavLink>
                    </Typography>
                    </Grid>
                </Grid>
                </ValidatorForm>
            </div>
        )
    }
}

export default Login;