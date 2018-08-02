import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import EditableList from './EditableList'
import UpdatableList from './UpdatableList'
import List from './List'
import ListHeaders from './ListHeaders'

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

let tempCount = 0;

class Home extends Component {    
    
    constructor(props) {
        super(props);
        this.state = {
          temp: [],
          items: [{}],
          updates: []
        };
        this.removeEdit = this.removeEdit.bind(this);
        this.addNewIdea = this.addNewIdea.bind(this);
        this.deleteIdea = this.deleteIdea.bind(this);
        this.updateIdea = this.updateIdea.bind(this);
        this.removeUpdate = this.removeUpdate.bind(this);
        this.addUpdate = this.addUpdate.bind(this)
      }


    componentWillMount() {
        const token = localStorage.getItem('token');
    
        const ideaHeaders  = {
            'Content-Type':'application/json',
            'X-Access-Token': token,
        }
    
        fetch('https://small-project-api.herokuapp.com/ideas', {
            method: 'GET',
            headers: ideaHeaders
        })
        .then(res => {
            try {
                return res.json()
            } catch (e) {
                console.log(e)
            }
        })
        .then(ideas => {
            this.setState({
                items: ideas
            })
        }) 
    }

    addEditable() {
        tempCount++;
        this.setState({
            temp: [...this.state.temp, tempCount ],
        })
        
    }

    removeEdit(id) {
        this.setState({
            temp: this.state.temp.filter(e => e !== id)
        })
    }

    addNewIdea(newIdea){
        this.setState({
            items: [...this.state.items, newIdea]
        })
    }

    deleteIdea(id) {
        this.setState({
            items: this.state.items.filter(e => e.id !== id)
        })
    }

    addUpdate(newIdea){
        const newItems = this.state.items.slice()
        newItems[this.state.items.findIndex(el => el.id === newIdea.id)] = newIdea
        this.setState({
            updates: this.state.updates.filter(e => e.id !== newIdea.id),
            items: newItems
        })
        console.log('added update')
    }

    removeUpdate(idea) {
        console.log(idea)
        this.setState({
            updates: this.state.updates.filter(e => e.id !== idea.id),
            items: [...this.state.items, idea]
        })
    }

    updateIdea(idea) {
        this.setState({
            items: this.state.items.filter(e => e.id !== idea.id),
            updates: [...this.state.updates, idea]
        })
    }



    render () {

        const anyIdeas = ( this.state.temp.length > 0 || this.state.items.length > 0  || this.state.updates.length > 0) ? true : false; 

        console.log(this.state)
        return (
            <div className="ideas">
               <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="title" gutterBottom>
                            My Ideas
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <MuiThemeProvider theme={theme}>
                        <Button variant="fab" mini color="primary" aria-label="Add" onClick={() => this.addEditable()}>
                            <AddIcon />
                        </Button>
                    </MuiThemeProvider>
                    </Grid>
                    <Grid  item xs={12} sm={12}>
                        <Divider/>
                    </Grid>
                    {
                            anyIdeas && 
                             <ListHeaders />
                    }
                   
                    <Grid  item xs={12} sm={12}>
                        {
                            anyIdeas ?
                            (
                                <div>
                                    <UpdatableList updates={this.state.updates} removeUpdate={this.removeUpdate} updateIdea={this.addUpdate}/>
                                    <EditableList ideas={this.state.temp} removeEdit={this.removeEdit} addNewIdea={this.addNewIdea}/>
                                    <List currentIdeas={this.state.items} deleteIdea={this.deleteIdea} updateIdea={this.updateIdea}/>
                                </div>
                            ) : (
                                <div className="gotIdeas">
                                    <img alt="Logo" src={require('../assets/bulb.png')} />
                                    <Typography variant="title" gutterBottom>
                                        Got Ideas?
                                    </Typography>
                                </div>
                            )
                        }
                        
                    </Grid>
                    
                </Grid>
            </div>
        )
    }
}

export default Home;