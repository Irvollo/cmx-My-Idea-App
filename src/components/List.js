import React, { Component } from 'react'
import Idea from './Idea'

export default class List extends Component {

  constructor (props) {
    super(props);
    this.state = {
    }
    this.deleteIdea = this.deleteIdea.bind(this);
    this.updateIdea = this.updateIdea.bind(this);
  }

  deleteIdea(id) {
    this.props.deleteIdea(id)
  }

  updateIdea(idea) {
    this.props.updateIdea(idea)
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.props.currentIdeas.map(x => <Idea key={x.id} currentIdea={x} deleteIdea={this.deleteIdea} updateIdea={this.updateIdea}/>)
          }
        </ul>
      </div>
    )
  }
}
