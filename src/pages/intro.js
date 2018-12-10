import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Intro extends Component {
  constructor() {
    super()
    this.state = {
      username: ''
    }

    this.change = this.change.bind(this)
    this.login = this.login.bind(this)
  }

  change(value) {
    this.setState({ username: value })
  }

  login() {
    this.props.login(this.state.username, this.props.history.push)
  }

  render() {
    return (
      <div className="wrap intro">
        <img className="logo-main" src="https://carefair.herokuapp.com/static/CHS.png" alt="chs-logo" />
        <div>
          <p>Username</p>
          <input className="input main" onChange={e => this.change(e.target.value)} value={this.state.username}/>
          <p>{this.props.message}</p>
          <button className="login" onClick={this.login}>Log in</button>
          <Link to="/signup"><button className="signup">Sign up</button></Link>
        </div>
      </div>
    )
  }
}

function login(username, push) {
  return dispatch => {
    axios.get(`http://localhost:8080/api/login/${username}`)
      .then(response => {
        push('/workouts')
        dispatch({
          type: 'login',
          payload: response.data
        })
      })
      .catch(err => {
        if (err.request.status === 400) {
          dispatch({
            type: 'fail',
            payload: 'Username not found'
          })
        } else {
          dispatch({
            type: 'fail',
            payload: 'Couldn\'t login; server error'
          })
        }
      })
  }
}

export default connect(state => state, { login })(Intro)