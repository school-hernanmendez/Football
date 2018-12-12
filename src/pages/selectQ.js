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
    var workoutDay = true;
    switch (this.props.day) {
      case 'Friday':
        workoutDay = false;
        break
      case 'Saturday':
        workoutDay = false;
        break
      case 'Sunday':
        workoutDay = false;
        break
      default:
        break
    }
    if (workoutDay) {
      return (
        <div className="wrap page">
          <Navbar />
          <p>Today is: {this.props.day}</p>
          <button className="quarter" onClick={() => this.select(1)}>1</button>
          <button className="quarter" onClick={() => this.select(2)}>2</button>
          <button className="quarter" onClick={() => this.select(3)}>3</button>
          <button className="quarter" onClick={() => this.select(4)}>4</button>
          <hr></hr>
        </div>
      )
    }
    return (
      <div className="wrap page">
        <Navbar />
        <p>Today is: {this.props.day}</p>
        <p>You shouldn't be in football class today but you can still choose a custom workout</p>
      </div>
    )
  }
}

function selectQuarter(n, push) {
  return dispatch => {
    push('/workouts')
    dispatch({
      type: 'qt',
      payload: n
    })
  }
}

export default connect(state => state, { selectQuarter })(Quarter)
