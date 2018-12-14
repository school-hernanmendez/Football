import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { API_URL } from '../var'

import Navbar from './navbar.js'

class Measures extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: props.height,
      weight: props.weight,
      workouts: props.workouts
    }

    this.changeHeight = this.changeHeight.bind(this)
    this.changeWeight = this.changeWeight.bind(this)
    this.changeWorkout = this.changeWorkout.bind(this)
    this.submit = this.submit.bind(this)
  }

  changeHeight(n,t) {
    if(t === 'f') {
      this.setState({ height: { feet: parseInt(n,10), inches: this.state.height.inches }})
    } else {
      this.setState({ height: { feet: this.state.height.feet, inches: parseInt(n,10) }})
    }
  }

  changeWeight(n) {
    this.setState({ weight: parseInt(n,10) })
  }

  changeWorkout(n, key) {
    this.setState(state => {
      state.workouts[key].num = parseInt(n,10)
      return state
    })
  }

  submit() {
    this.props.submit(this.props._id, this.state, this.props.history.push)
  }
  
  render() {
    return (
      <div className="wrap page withnav">
        <Navbar push={this.props.history.push} type="measurements" />
        <div className="height">
          <p>Height</p>
          <div>
            <div>
            <span>Feet</span>
            <input
              className="input one"
              type="number"
              value={this.state.height.feet}
              onChange={e => this.changeHeight(e.target.value, 'f')}/>
            </div>
            <div>
            <span>Inches</span>
            <input
              className="input"
              type="number"
              value={this.state.height.inches}
              onChange={e => this.changeHeight(e.target.value, 'n')}
            />
            </div>
          </div>
        </div>
        <div className="weight">
          <p>Weight</p>
          <input className="input" type="number" value={this.state.weight} onChange={e => this.changeWeight(e.target.value)}/>
        </div>
        <p className="subtitle eighty">Set your max</p>
        <div className="workouts">
        {
          Object.keys(this.state.workouts).filter(i => {
            return this.state.workouts[i].type !== 'no'
          }).sort((a,b) => {
            const an = this.state.workouts[a].type === 'n' ? 1 : 0
            const bn = this.state.workouts[b].type === 'n' ? 1 : 0
            return an - bn
          }).map(i => {
            return (
              <div className="workout-input" key={i}>
                <span className="workout">
                  {i.replace(/_/g, ' ').replace(/^(.)|\s(.)/g, ($1) => $1.toUpperCase())}
                  {this.state.workouts[i].type === 'lbs' && ' (lbs)'}
                </span>
                <input
                  className="input workout"
                  type="number"
                  value={this.state.workouts[i].num}
                  onChange={e => this.changeWorkout(e.target.value,i)}
                />
              </div>
            )
          })
        }
        </div>
        <p className="bigger">{this.props.message}</p>
        <button onClick={() => this.submit()} className="done">Done</button>
      </div>
    )
  }
}

function submit(id, object, push) {
  return dispatch => {
    axios.post(`${API_URL}/api/change/${id}`, object)
      .then(response => {
        dispatch({
          type: 'change',
          payload: response.data
        })
        push('/selectQ');
      })
      .catch(err => {
        dispatch({
          type: 'fail',
          payload: 'Couldn\'t change measurements; server error'
        })
      })
  }
}

export default connect(state => state, { submit })(Measures)