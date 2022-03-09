import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.onTodoFormSubmit}>
        <input 
          value={this.props.todoNameInput} 
          type="text" placeholder="Type todo" 
          onChange={this.props.onInputChange } 
        />
        <input type="submit" />
      </form>
    )
  }
}
