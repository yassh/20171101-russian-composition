import React from 'react'
import PropTypes from 'prop-types'

export default class Counter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0,
    }
  }

  decrease() {
    this.setState({ count: this.state.count - this.props.step })
  }

  increase() {
    console.log(this.state.count)
    this.setState({ count: this.state.count + this.props.step })
  }

  render() {
    const { step } = this.props
    const { count } = this.state
    const decrease = () => { this.decrease() }
    const increase = () => { this.increase() }

    return (
      <div>
        <button type="button" onClick={decrease}>-{ step }</button>
        { count }
        <button type="button" onClick={increase}>+{ step }</button>
      </div>
    )
  }
}

Counter.propTypes = {
  step: PropTypes.number,
}

Counter.defaultProps = {
  step: 1,
}
