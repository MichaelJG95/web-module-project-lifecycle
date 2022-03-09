import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return(
      <ul>
          {
            this.props.todos.reduce((acc, todo) => {
              if (this.props.displayCompleteds || !todo.completed) return acc.concat(
                <Todo key={todo.id} toggleCompleted={this.props.toggleCompleted} todo={todo} />
              )
              return acc
            }, [])
            // this.props.todos.map(todo => {
            //   return (<Todo key={todo.id} toggleCompleted={this.props.toggleCompleted} todo={todo} />)
            // })
          }
        </ul>
    )
  }
}