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
        <div className="wrap page withnav">
          <Navbar history={this.props.history} />
          <p className="bigger-j ninety">Today is: {this.props.day}</p>
          <p className="bigger-j ninety">Select the starting quarter</p>
          <div className="quarter-wrap ninety">
           <button className="quarter" onClick={() => this.select(1)}>1</button>
           <button className="quarter" onClick={() => this.select(2)}>2</button>
           <button className="quarter" onClick={() => this.select(3)}>3</button>
           <button className="quarter" onClick={() => this.select(4)}>4</button>
           <button className="fill-btn custom ninety" onClick={() => this.props.history.push('/custom')}>Custom Workout</button>
          </div>
        </div>
      )
    }
    return (
      <div className="wrap page withnav">
        <Navbar history={this.props.history} />
        <div>
        <p className="bigger-j eighty">Today is: {this.props.day}</p>
        <br />
        <p className="bigger-j eighty">You shouldn't be in football class today, but you can still choose a custom workout</p>
        <br /><br />
        </div>
        <button className="fill-btn eighty" onClick={() => this.props.history.push('/custom')}>Custom Workout</button>
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
    push('/workouts')
  }
}

export default connect(state => state, { selectQuarter })(Quarter)
