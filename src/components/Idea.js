import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit'
import DeleteConfirmation from './DeleteConfirmation'
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

export default class Idea extends Component {

    constructor () {
        super();
        this.state = {
        }
        this.deleteIdea = this.deleteIdea.bind(this)
        this.updateIdea = this.updateIdea.bind(this)
    }

    deleteIdea(id) {
        this.props.deleteIdea(id)
    }

    updateIdea() {
        this.props.updateIdea(this.props.currentIdea)
    }

  render() {

    return (
      <li>
          <Grid container spacing={8} >
            <Grid item xs={12} sm={6}>
                <Typography variant="subheading">
                    {this.props.currentIdea.content}
                </Typography>
            </Grid>
            <Grid item xs={4} sm={1}  >
                <Typography variant="subheading">
                    {this.props.currentIdea.impact}
                </Typography>
            </Grid>
            <Grid item xs={4} sm={1}>
                <Typography variant="subheading">
                    {this.props.currentIdea.ease}
                </Typography>
            </Grid>
            <Grid item xs={4} sm={1}>
                <Typography variant="subheading">
                    {this.props.currentIdea.confidence}
                </Typography>
            </Grid>
            <Grid item xs={4} sm={1}>
                <Typography variant="subheading">
                    {Math.round(this.props.currentIdea.average_score * 10) / 10 }
                </Typography>
            </Grid>
            <Grid item xs={4} sm={1}>
                <MuiThemeProvider theme={theme}>
                    <Button onClick={this.updateIdea}>
                            <Edit color="primary" />
                    </Button>    
                </MuiThemeProvider>
            </Grid>
            <Grid item xs={4} sm={1}>
                <DeleteConfirmation id={this.props.currentIdea.id} onDeleteIdea={this.deleteIdea} />
            </Grid>
        </ Grid>
      </li>
    )
  }
}
