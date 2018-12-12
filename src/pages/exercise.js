import React, { Component } from 'react'
import { connect } from 'react-redux'

import Navbar from './navbar'

class Workout extends Component {
  constructor() {
    super()
    this.state = {
      timer: 12 * 60,
      runningTimer: 12*60,
      running: false
    }
    this.workouts = {
      Tuesday: [1,2,3,4]
    }
  }
  startTimer() {

  }
  resetTimer() {

  }
  changeTimer() {

  }
  render() {
    return (
      <div classname="wrap page">
        <Navbar />
        <div classname="timer"></div>
        {
          this.workouts[this.props.day].map(i => {
            return <div>{i}</div>
          })
        }
        <button>Next Workout</button>
      </div>
    )
  }
}

function quarterChange(c) {
  return dispatch => {
    dispatch({
      type: 'qt',
      payload: c+1
    })
  }
}

export default connect(state => state, { quarterChange })(Workout)