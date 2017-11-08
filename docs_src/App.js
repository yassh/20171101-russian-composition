import React from 'react'
import Counter from './Counter'
import style from './App.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: 'こんにちは！',
      items: ['Alpha', 'Beta', 'Gamma'],
      inputValue: '',
    }
  }

  onSubmit(e) {
    e.preventDefault()
    this.setState({ items: [...this.state.items, this.state.inputValue] })
    this.setState({ inputValue: '' })
  }

  onInput(e) {
    this.setState({ inputValue: e.target.value })
  }

  render() {
    const { message, items, inputValue } = this.state
    const onSubmit = (e) => { this.onSubmit(e) }
    const onInput = (e) => { this.onInput(e) }

    return (
      <div className={style.root}>
        <p className={style.message}>{ message }</p>

        <Counter />
        <Counter step={10} />

        <form onSubmit={onSubmit}>
          <input type="text" onInput={onInput} value={inputValue} />
          <input type="submit" value="Add" />
        </form>

        { items.length &&
          <ul>
            { items.map(item => (
              <li>{ item }</li>
            ))}
          </ul>
        }
      </div>
    )
  }
}
