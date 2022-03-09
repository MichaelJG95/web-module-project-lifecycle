import React from 'react'

export default class Todo extends React.Component {
  handleClick = () => {
    this.props.toggleCompleted(this.props.todo.id)
  }
  render() {
    return (
      <li onClick={this.handleClick}>{this.props.todo.name} { this.props.todo.completed ? ' ✔️' : ''}</li>
    )
  }
}