import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
      <form onSubmit={this.props.onTodoFormSubmit}>
        <input 
          type="text" 
          placeholder="Type todo" 
          value={this.props.todoNameInput} 
          onChange={this.props.onInputChange } 
        />
        <input type="submit" />
      </form>
      <button 
        onClick={this.props.toggleDisplayCompleteds}
      >
          {this.props.displayCompleteds ? 'Hide' : 'Show'} Completed
      </button>
      </>
    )
  }
}
