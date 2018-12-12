import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../var'

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
      <div className="wrap page">
        <img className="logo-main" src="/logo.svg" alt="chs-logo" />
        <div>
          <p className="bigger">Username</p>
          <input className="input main" onChange={e => this.change(e.target.value)} value={this.state.username}/>
          <p>{this.props.message}</p>
          <button className="full-btn fill-btn" onClick={this.login}>Log in</button>
          <Link to="/signup"><button className="full-btn empty-btn">Sign up</button></Link>
        </div>
      </div>
    )
  }
}

function login(username, push) {
  return dispatch => {
    axios.get(`${API_URL}/api/login/${username}`)
      .then(response => {
        push('/selectQ')
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