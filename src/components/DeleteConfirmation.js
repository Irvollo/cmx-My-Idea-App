import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Delete from '@material-ui/icons/Delete'

class DeleteConfirmation extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    const token = localStorage.getItem('token');

    const ideaHeaders  = {
        'Content-Type':'application/json',
        'X-Access-Token': token,
    }

    const url = 'https://small-project-api.herokuapp.com/ideas/' + this.props.id

    console.log(url)

    fetch(url , {
        method: 'DELETE',
        headers: ideaHeaders,
    })
    .then(res => {
        if (res.status === 204) {
            console.log('idea deleted!')  
            this.handleClose()
            this.props.onDeleteIdea(this.props.id)
        } else {
            console.log('error!') 
        }
    })
  }

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Button onClick={this.handleClickOpen}><Delete /></Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
                This idea will be permantly deleted
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


export default DeleteConfirmation;