import React from 'react'
import arrayShuffle from 'array-shuffle'
import Papa from 'papaparse'
import './App.css'

const MAX_CARDS = 8

function speak(text) {
  const ssu = new SpeechSynthesisUtterance()
  ssu.text = text
  ssu.lang = 'ru'
  ssu.rate = 0.75

  speechSynthesis.speak(ssu)
}

function removeAccent(str) {
  return str.replace(/\u0301/g, '')
}

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

  searchCards(str) {
    if (!str) {
      this.drawCards()
      return
    }

    const cards = this.state.data
      .filter(card => card.ja.includes(str) || removeAccent(card.ru).includes(removeAccent(str)))
      .slice(0, MAX_CARDS)

    this.setState({ cards })
  }

  render() {
    const { cards } = this.state
    const handleClickDrawCards = () => { this.drawCards() }
    const handleInputSearch = (e) => { this.searchCards(e.target.value) }

    return (
      <div>
        <button type="button" onClick={handleClickDrawCards}>Draw cards</button>
        <input type="text" onInput={handleInputSearch} placeholder="Search" />

        <div className="cardList">
          { cards.map((card) => {
            this.number += 1

            return (
              <div key={this.number} className="cardList-item">
                <details className="card">
                  <summary>{ card.ja }</summary>
                  <p className="card-content">
                    <span className="card-speakButton" onClick={() => { speak(card.ru) }}>🔈</span>
                    { card.ru }
                  </p>
                </details>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
