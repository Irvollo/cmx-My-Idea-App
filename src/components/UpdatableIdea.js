import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Done from '@material-ui/icons/Done'
import Clear from '@material-ui/icons/Clear'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


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

export default class UpdatableIdea extends Component {

    constructor (props) {
        super(props);
        this.state = {
            content: props.idea.content,
            impact: props.idea.impact,
            ease: props.idea.ease,
            confidence: props.idea.confidence
        }
        this.handleChange = this.handleChange.bind(this);
        this.removeUpdateHandler = this.removeUpdateHandler.bind(this)
    }
    
    
    

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
        
    handleSubmit(event) {
        event.preventDefault();
        const token = localStorage.getItem('token');

        const ideaBody = JSON.stringify({
            "content": this.state.content,
            "impact": this.state.impact,
            "ease": this.state.ease,
            "confidence": this.state.confidence
        })

        const ideaHeaders  = {
            'Content-Type':'application/json',
            'X-Access-Token': token,
        }
        
        const url = 'https://small-project-api.herokuapp.com/ideas/' + this.props.idea.id

        fetch(url, {
            method: 'PUT',
            headers: ideaHeaders,
            body: ideaBody
        })
        .then(res => {
            if (res.status === 200) {
                console.log('idea updated!')  
                this.removeUpdateHandler() 
                return res.json()
            } else {
                console.log('error!') 
            }
        })
        .then(newIdea => {
            console.log(newIdea)
            this.props.onUpdateIdea(newIdea)
        })
    }

    removeUpdateHandler(e) {
        this.props.onRemoveUpdate(this.props.idea);
    }

  render() {
    var ratings = [
        { payload: 1, text: '1' },
        { payload: 2, text: '2' },
        { payload: 3, text: '3' },
        { payload: 4, text: '4' },
        { payload: 5, text: '5' },
        { payload: 6, text: '6' },
        { payload: 7, text: '7' },
        { payload: 8, text: '8' },
        { payload: 9, text: '9' },
        { payload: 10, text: '10' },
        ];
        

    const average = (this.state.impact + this.state.ease + this.state.confidence ) / 3;

    return (
      <li>
          <form onSubmit={(e) => this.handleSubmit(e)} >
          <Grid container spacing={8} >
            <Grid item xs={12} sm={6}>
                <TextField
                value={this.state.content}
                onChange={this.handleChange}
                placeholder="Type your idea"
                inputProps={{
                    name: 'content',
                    id: 'idea-simple',
                }}
                margin="normal"
                />
            </Grid>
            <Grid item xs={4} sm={1}  >
            <br />
                <Select
                value={this.state.impact}
                onChange={this.handleChange}
                inputProps={{
                name: 'impact',
                id: 'impact-simple',
                }}
                >
                {ratings.map(x => <MenuItem key={x.payload} value={x.payload} > {x.text} </MenuItem>)}
                </Select>
            </Grid>
            <Grid item xs={4} sm={1}>
                <br />
                <Select
                style={{ verticalAlign: 'bottom' }}
                value={this.state.ease}
                onChange={this.handleChange}
                inputProps={{
                name: 'ease',
                id: 'ease-simple',
                }}
                >
                {ratings.map(x => <MenuItem key={x.payload} value={x.payload} > {x.text} </MenuItem>)}
            </Select>
            </Grid>
            <Grid item xs={4} sm={1}>
            <br />
                <Select
                value={this.state.confidence}
                onChange={this.handleChange}
                inputProps={{
                name: 'confidence',
                id: 'confidence-simple',
                }}
                >
                {ratings.map(x => <MenuItem key={x.payload} value={x.payload} > {x.text} </MenuItem>)}
            </Select>
            </Grid>
            <Grid item xs={4} sm={1}>
            <br />
                <Typography variant="subheading" style={{ marginTop: '5px' }}>
                    {"\n"}
                    {Math.round(average * 100) / 100}
                </Typography>
            </Grid>
            <Grid item xs={4} sm={1}>
                <MuiThemeProvider theme={theme}>
                    <br/>
                    <Button type="submit">
                            <Done color="primary" />
                    </Button>    
                </MuiThemeProvider>
            </Grid>
            <Grid item xs={4} sm={1}>
                <br/>
                <Button >
                     <Clear onClick={this.removeUpdateHandler}/>
                </Button>   
            </Grid>
        </ Grid>
        </form>
      </li>
    )
  }
}
