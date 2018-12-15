import React, { Component } from 'react'
import { connect } from 'react-redux'

import Navbar from './navbar'

class Quarter extends Component {
  constructor() {
    super()
    this.state = {}
    this.select = this.select.bind(this)
  }
  select(n) {
    this.props.selectQuarter(n, this.props.history.push)
  }
  render() {
    return (
      <div className="wrap page withnav">
        <Navbar history={this.props.history} />
        <p className="bigger-j ninety">Selected day: {this.props.cDay}</p>
        <p className="bigger-j ninety">Select the starting quarter</p>
        <div className="quarter-wrap ninety">
          <button className="quarter" onClick={() => this.select(1)}>1</button>
          <button className="quarter" onClick={() => this.select(2)}>2</button>
          <button className="quarter" onClick={() => this.select(3)}>3</button>
          <button className="quarter" onClick={() => this.select(4)}>4</button>
        </div>
      </div>
    )
  }
}

function selectQuarter(n, push) {
  return dispatch => {
    dispatch({
      type: 'qt',
      payload: n
    })
    push('/cWorkout')
  }
}

export default connect(state => state, { selectQuarter })(Quarter)
