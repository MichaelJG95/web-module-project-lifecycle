import React from 'react'
import axios from 'axios'
import TodoList from './TodoList'
import Form from './Form'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      error: '',
      todoNameInput: '',
      displayCompleteds: true,
    }
  }
  
  onInputChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoNameInput: value })
  }
  
  resetForm = () => this.setState({ ...this.state, todoNameInput: ''})
  
  setAxiosResponseError = err => this.setState({ ...this.state, error: err.response.data.message })
  
  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data)})
        this.resetForm()
      })
      .catch(this.setAxiosResponseError)
  }
  
  onTodoFormSubmit = (evt) => {
    evt.preventDefault()
    this.postNewTodo()
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(this.setAxiosResponseError)
  }

  toggleDisplayCompleteds = () => {
    this.setState({ ...this.state, displayCompleteds: !this.state.displayCompleteds })
  }
  
  componentDidMount() {
    this.fetchAllTodos()
  }

  toggleCompleted = id => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.map(todo => {
          if(todo.id !== id) return todo
          return res.data.data
        })})
      })
      .catch(this.setAxiosResponseError)
  }

  handleToggle = (clickedId) => {
    this.setState({
      ...this.state,
      todos: this.state.todos.map(todo => {
        if (todo.id === clickedId){
          return {
            ...todo,
            completed: !todo.completed
          }
        }

        return todo
      })
    })
  }
 
  render() {
    const { todos } = this.state

    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <TodoList 
          todos={todos} 
          displayCompleteds={this.state.displayCompleteds} 
          toggleCompleted={this.toggleCompleted} 
        />
        <Form 
          onTodoFormSubmit={this.onTodoFormSubmit} 
          onInputChange={this.onInputChange} 
          toggleDisplayCompleteds={this.toggleDisplayCompleteds}
          todoNameInput={this.state.todoNameInput} 
          displayCompleteds={this.state.displayCompleteds}
        />
      </div>
    )
  }
}
