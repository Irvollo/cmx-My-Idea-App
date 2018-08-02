import React, { Component } from 'react'
import EditableIdea from './EditableIdea'

export default class EditableList extends Component {

  constructor (props) {
    super(props);
    this.state = {
    }
    this.removeEdit = this.removeEdit.bind(this)
    this.addNewIdea = this.addNewIdea.bind(this)
  }

  addNewIdea(idea) {
    this.props.addNewIdea(idea);
  }

  removeEdit(id) {
    this.props.removeEdit(id);
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.props.ideas.map((x) => { return <EditableIdea key={x} id={x} onRemoveEdit={this.removeEdit} onNewIdea={this.addNewIdea} />})
          }
        </ul>
      </div>
    )
  }
}
