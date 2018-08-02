import React, { Component } from 'react'
import UpdatableIdea from './UpdatableIdea'

export default class EditableList extends Component {

  constructor (props) {
    super(props);
    this.state = {
    }
    this.removeUpdate = this.removeUpdate.bind(this)
    this.addUpdate = this.addUpdate.bind(this)
  }

  addUpdate(idea) {
    this.props.updateIdea(idea);
  }

  removeUpdate(idea) {
    this.props.removeUpdate(idea);
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.props.updates.map((x) => { return <UpdatableIdea key={x.id} id={x.id} idea={x} onRemoveUpdate={this.removeUpdate} onUpdateIdea={this.addUpdate} />})
          }
        </ul>
      </div>
    )
  }
}
