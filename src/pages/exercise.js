import React, { Component } from 'react'
import { connect } from 'react-redux'

import Navbar from './navbar'

class Timer extends Component {
  constructor() {
    super()
    this.state = {
      timer: 12 * 60,
      runningTimer: 12*60,
      running: false
    }
  }
  startTimer() {
    
  }
  resetTimer() {

  }
  changeTimer() {

  }
  render() {
    if(this.state.running) {
      return (
        <div></div>
      )
    }
    return (
      <div></div>
    )
  }
}

class Workout extends Component {
  constructor() {
    super()
    this.state = {}
    this.workouts = {
      Monday: [
        [],
        [],
        [],
        []
      ],
      Tuesday: [
        [],
        [],
        [],
        []
      ],
      Wednesday: [
        [],
        [],
        [],
        []
      ],
      Thursday: [
        [],
        [],
        [],
        []
      ],
    }
  }
  render() {
    return (
      <div classname="wrap page">
        <Navbar />
        <Timer />
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