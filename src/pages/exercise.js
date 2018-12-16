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
    if (this.state.runningTimer !== 0) {
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
  componentDidUpdate(prevProps) {
    if (prevProps.q !== this.props.q) {
      this.setState({ running: false, paused: true, runningTimer: this.state.timer })
      clearInterval(this.timer)
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
        <p className={`x1 ${r ? 'x0' : ''}`} onClick={() => this.changeTimer(true)}><i className="material-icons">add</i></p>
        <p className={`x1 ${r ? 'x0' : ''}`} onClick={() => this.changeTimer(false)}><i className="material-icons">remove</i></p>
        <span className={`time ${r ? 'small' : ''}`}>{minutes + ':' + seconds}</span>
        <div className={`bar ${r ? 'big' : ''}`}>
          <div className="blue" style={{ width: (this.state.runningTimer / this.state.timer) * 100 + '%' }}></div>
          <div className="dark"></div>
        </div>
        <p className={`x1 ${r ? (p ? '' : 'x0') : ''}`} onClick={() => this.startTimer()}><i className="material-icons">play_arrow</i></p>
        <p className={`x1 ${r ? (p ? 'x0' : '') : 'x0'}`} onClick={() => this.pauseTimer()}><i className="material-icons">pause</i></p>
        <p className={`x1 ${r ? (p ? '' : 'xr') : 'x0 xr'}`} onClick={() => this.resetTimer()}><i className="material-icons">replay</i></p>
      </div>
    )
  }
}

class Workout extends Component {
  constructor(props) {
    super(props)
    this.workouts = {
      Monday: [
        ['power_clean', 'partner_neck', 'spot_neck', 'wT_crunch'],
        ['press_variations', 'spot', 'pizza_pies'],
        ['squat', 'plate_good_mornings', 'jump_rope', 'sabers'],
        ['team_finishers']
      ],
      Tuesday: [
        ['clean_&_jerk', 'pull_up', 'spot', 'dead_bugs'],
        ['bench', 'spot', 'dB_rows', 'walking_lunge'],
        ['squat_variation', 'straight_leg_deadlift', 'calves_raises', 'chopping_wood'],
        ['team_finishers']
      ],
      Wednesday: [
        ['hang_clean', 'partner_hip', 'spot_hip', 'knees_2_elbows'],
        ['press_variations', 'spot', 'pizza_pies'],
        ['squat', 'supermans', 'jump_rope', 'bar_thrusters'],
        ['team_finishers']
      ],
      Thursday: [
        ['snatch', 'pull_up', 'spot', 'plank_raises'],
        ['bench', 'spot', 'dB_rows', 'overhead_walking_lunge'],
        ['squat_variation', 'romanian_deadlift', 'calves_raises', 'chopping_wood'],
        ['team_finishers']
      ],
    }
    let workout = {}
    if(props.custom) {
      workout = this.workouts[props.cDay][props.quarter]
    } else {
      workout = this.workouts[props.day][props.quarter]
    }
    this.workout = {}
    for (let i = 0; workout.length > i; i++) {
      this.workout[workout[i]] = {
        name: workout[i].replace(/_/g, ' ').replace(/^(.)|\s(.)/g, ($1) => $1.toUpperCase()),
        done: false
      }
    }
    this.done = this.done.bind(this)
    this.nextQuarter = this.nextQuarter.bind(this)
    this.finishWorkout = this.finishWorkout.bind(this)
  }
  done(n) {
    this.workout[n].done = !this.workout[n].done;
    this.forceUpdate()
  }
  nextQuarter() {
    if (Object.keys(this.workout).filter(i => !this.workout[i].done).length === 0) {
      const newState = {}
      const workout = this.workouts[this.props.custom ? this.props.cDay : this.props.day][this.props.quarter + 1]
      for (let i = 0; workout.length > i; i++) {
        newState[workout[i]] = {
          name: workout[i].replace(/_/g, ' ').replace(/^(.)|\s(.)/g, ($1) => $1.toUpperCase()),
          done: false
        }
      }
      this.workout = newState
      this.props.quarterChange(this.props.quarter)
      this.forceUpdate()
    }
  }
  finishWorkout() {
    if (Object.keys(this.workout).filter(i => !this.workout[i].done).length === 0) {
      this.props.history.push('/selectQ')
    }
  }
  render() {
    const done = Object.keys(this.workout).filter(i => !this.workout[i].done).length === 0
    return (
      <div className="withnav">
        <Navbar history={this.props.history} />
        <div className="exercise">
          <Timer q={this.props.quarter} />
          {
            Object.keys(this.workout).map((i, index) => {
              return (
                <div
                  key={`${this.props.custom ? this.props.cDay : this.props.day}${index}`}
                  className={`workout-r ${this.workout[i].done ? 'green' : 'red'}`}
                  onClick={() => this.done(i)}
                >
                  <p className="bigger">{this.workout[i].name}</p>
                  {this.props.workouts[i].type === 'lbs' && (
                    <div>
                      <span>Sets: 3 - Reps: 5</span><br/>
                      {this.props.workouts[i].num ? <span>Recommended Weight: {
                        (Math.round(this.props.workouts[i].num * .8) % 5) === 0 ? 
                         Math.round(this.props.workouts[i].num * .8) :
                         Math.floor(Math.round(this.props.workouts[i].num * .8) / 5) * 5
                      }</span> : ''}
                    </div>
                  )
                  }
                  {this.props.workouts[i].type === 'n' && (
                      <div>
                        <span>Goal reps (current max): {this.props.workouts[i].num}</span>
                      </div>
                    )
                  }
                </div>
              )
            })
          }
          <button
            className={`next-w ${done ? 'go' : 'halt'}`}
            onClick={this.props.quarter !== 3 ? () => this.nextQuarter() : () => this.finishWorkout()}
          >
            {this.props.quarter !== 3 ? (<span><span>Next Workout</span><i className="material-icons">chevron_right</i></span>) : <span>Finish workout</span>}
          </button>
        </div>
      </div>
    )
  }
}

function quarterChange(c) {
  return dispatch => {
    dispatch({
      type: 'qt',
      payload: c + 2
    })
  }
}

export default connect(state => state, { quarterChange })(Workout)