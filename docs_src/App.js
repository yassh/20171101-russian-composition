import React from 'react'
import arrayShuffle from 'array-shuffle'
import Papa from 'papaparse'
import './App.css'

const MAX_CARDS = 8

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.number = 0

    this.state = {
      data: [],
      cards: [],
    }

    Papa.parse('https://raw.githubusercontent.com/yassh/data/master/jaru.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        this.setState({ data: result.data })
        this.drawCards()
      },
      error: (err) => {
        console.error(err)
      },
    })
  }

  drawCards() {
    const cards = arrayShuffle(this.state.data).slice(0, MAX_CARDS)
    this.setState({ cards })
  }

  render() {
    const { cards } = this.state
    const drawCards = () => { this.drawCards() }

    return (
      <div>
        <button type="button" onClick={drawCards}>Draw cards</button>

        <div className="cardList">
          { cards.map((card) => {
            this.number += 1

            return (
              <div className="cardList-item">
                <details key={this.number} className="card">
                  <summary>{ card.ja }</summary>
                  <p className="card-content">{ card.ru }</p>
                </details>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
