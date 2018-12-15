import React, { Component } from 'react'
import { connect } from 'react-redux'

import Navbar from './navbar'

class Timer extends Component {
  constructor() {
    super()
    this.state = {
      timer: 12 * 60,
      runningTimer: 12 * 60,
      running: false,
      paused: true
    }
    this.startTimer = this.startTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.changeTimer = this.changeTimer.bind(this)
    this.pauseTimer = this.pauseTimer.bind(this)
  }
  startTimer() {
    if(this.state.runningTimer !== 0) {
    if (this.state.running) {
      this.setState({ paused: false })
      this.timer = setInterval(() => {
        if (this.state.runningTimer !== 0) {
          this.setState({ runningTimer: this.state.runningTimer - 1 })
        } else {
          this.setState({ paused: true })
          clearInterval(this.timer)
        }
      }, 1000)
    } else {
      this.setState({ paused: false, running: true })
      this.timer = setInterval(() => {
        if (this.state.runningTimer !== 0) {
          this.setState({ runningTimer: this.state.runningTimer - 1 })
        } else {
          this.setState({ paused: true })
          clearInterval(this.timer)
        }
      }, 1000)
    }
  }
  }
  pauseTimer() {
    console.log('hey')
    this.setState({ paused: true })
    clearInterval(this.timer)
  }
  resetTimer() {
    if (this.state.paused) {
      this.setState({ running: false, paused: true, runningTimer: this.state.timer })
      clearInterval(this.timer)
    }
  }
  changeTimer(increase) {
    if (increase) {
      this.setState({ runningTimer: this.state.runningTimer + 30, timer: this.state.timer + 30 })
    } else {
      if (this.state.timer !== 0) {
        this.setState({ runningTimer: this.state.runningTimer - 30, timer: this.state.timer - 30 })
      }
    }
  }
  render() {
    var minutes = String(Math.floor(this.state.runningTimer / 60))
    minutes = minutes.length > 1 ? minutes : '0' + minutes
    var seconds = String(Math.floor(this.state.runningTimer % 60))
    seconds = seconds.length > 1 ? seconds : '0' + seconds
    var r = this.state.running
    var p = this.state.paused
    return (
      <div className="timer">
        <p className={`x1 ${r ? 'x0' : ''}`} onClick={() => this.changeTimer(true)}><i class="material-icons">add</i></p>
        <p className={`x1 ${r ? 'x0' : ''}`} onClick={() => this.changeTimer(false)}><i class="material-icons">remove</i></p>
        <span className={`time ${r ? 'small' : ''}`}>{minutes + ':' + seconds}</span>
        <div className={`bar ${r ? 'big' : ''}`}>
          <div className="blue" style={{ width: (this.state.runningTimer / this.state.timer) * 100 + '%' }}></div>
          <div className="dark"></div>
        </div>
        <p className={`x1 ${r ? (p ? '' : 'x0') : ''}`} onClick={() => this.startTimer()}><i class="material-icons">play_arrow</i></p>
        <p className={`x1 ${r ? (p ? 'x0' : '') : 'x0'}`} onClick={() => this.pauseTimer()}><i class="material-icons">pause</i></p>
        <p className={`x1 ${r ? (p ? '' : 'xr') : 'x0 xr'}`} onClick={() => this.resetTimer()}><i class="material-icons">replay</i></p>
      </div>
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
      <div className="withnav">
        <Navbar history={this.props.history} />
        <div className="exercise">
          <Timer />
          {
            this.workouts['Tuesday'].map((i, index) => {
              return <div key={`${'Tuesday'}${index}`}>{i}</div>
            })
          }
          <button>Next Workout</button>
        </div>
      </div>
    )
  }
}

function quarterChange(c) {
  return dispatch => {
    dispatch({
      type: 'qt',
      payload: c + 1
    })
  }
}

export default connect(state => state, { quarterChange })(Workout)