import React, { Fragment } from 'react'

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      text: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const value = e.target.value
    this.setState(() => {
      return {
        text: value
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    const { text } = this.state

    if (!text.length) {
      return
    }

    const newItem = {
      text,
      id: Date.now(),
      done: false
    }

    this.setState((state) => ({
      items: state.items.concat(newItem),
      text: ''
    }))
  }

  render() {
    const { items, text } = this.state

    return (
      <div>
        <h3>TODO</h3>
        <ul>
          {items.map((item) =>
            !item.done ? (
              <TodoItem
                key={item.id}
                id={item.id}
                text={item.text}
                done={item.done}
              />
            ) : null
          )}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">What needs to be done?</label>
          <input id="new-todo" onChange={this.handleChange} value={text} />
          <button>Add #{items.length + 1}</button>
        </form>
      </div>
    )
  }
}

class TodoItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      done: false,
      date: null
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState((state) => ({
      done: !state.done,
      date: new Date()
    }))
  }
  render() {
    const { id, text } = this.props
    const { done, date } = this.state

    return (
      <Fragment>
        <li key={id}>
          {text}
          {done ? ' - Finished ' + date : null}
          <button onClick={this.handleClick}>
            {!done ? 'Finish' : 'Activate'}
          </button>
        </li>
      </Fragment>
    )
  }
}

/* ReactDOM.render(<TodoApp />, document.getElementById('root'))
 */
