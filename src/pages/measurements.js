import React, { Component } from 'react'
import { connect } from 'react-redux'

import Navbar from './navbar.js'

class Measures extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: props.height,
      weight: props.weight,
      workouts: props.workouts
    }
  }

  changeHeight() {

  }

  changeWeight() {

  }

  changeWorkout() {

  }

  submit() {

  }
  
  render() {
    return (
      <div class="wrap page">
        <Navbar />
        <p>Set your max</p>
        {
          Object.keys(this.state.workouts).filter(i => {
            return this.state.workouts[i].type != 'no'
          }).map(i => {
            return (
              <div className="workout-input">
                <p>{i.replace(/\_/g, ' ').replace(/^(.)|\s(.)/g, ($1) => $1.toUpperCase())}</p>
                <input className="input" value={this.state.workouts[i].num}/>
              </div>
            )
          })
        }
        <button>Done</button>
      </div>
    )
  }
}

function submit() {}

export default connect(state => state)(Measures)