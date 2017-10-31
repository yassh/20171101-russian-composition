import React from 'react'
import axios from 'axios'
import arrayShuffle from 'array-shuffle'
import csvParse from 'csv-parse/lib/sync'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.number = 0

    this.state = {
      data: [],
      cards: [],
    }

    axios({
      url: 'https://raw.githubusercontent.com/yassh/data/master/jaru.csv',
    }).then((res) => {
      const data = csvParse(res.data, { columns: true })
      this.setState({ data })
      this.drawCards()
    }).catch((err) => {
      console.error(err)
    })
  }

  drawCards() {
    const cards = arrayShuffle(this.state.data).slice(0, 5)
    this.setState({ cards })
  }

  render() {
    const { cards } = this.state
    const drawCards = () => { this.drawCards() }

    return (
      <div>
        <button type="button" onClick={drawCards}>Draw cards</button>

        { cards.map((card) => {
          this.number += 1

          return (
            <details key={this.number}>
              <summary>{ card.ja }</summary>
              <p>{ card.ru }</p>
            </details>
          )
        })}
      </div>
    )
  }
}
