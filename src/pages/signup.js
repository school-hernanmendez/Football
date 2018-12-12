import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../var'

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      firstname: '',
      lastname: ''
    }

    this.change = this.change.bind(this)
    this.signup = this.signup.bind(this)
  }

  change(value, where) {
    this.setState({ [where]: value })
  }

  signup() {
    this.props.signup(this.state, this.props.history.push)
  }

  render() {
    return (
      <div className="wrap page">
        <img className="logo-main-sm" src="/logo.svg" alt="chs-logo" />
        <div>
          <p className="bigger">Username</p>
          <input className="input main" onChange={e => this.change(e.target.value, 'username')} value={this.state.username}/>
          <p className="bigger">First name</p>
          <input className="input main" onChange={e => this.change(e.target.value, 'firstname')} value={this.state.firstname}/>
          <p className="bigger">Last name</p>
          <input className="input main" onChange={e => this.change(e.target.value, 'lastname')} value={this.state.lastname}/>
          <p>{this.props.message} </p>
          <button onClick={() => this.signup()} className="full-btn fill-btn">Sign up</button>
          <Link to="/"><button className="full-btn empty-btn">Back to Log in</button></Link>
        </div>
      </div>
    )
  }
}

function signup(object, push) {
  return dispatch => {
    if(object.username && object.firstname && object.lastname) {
    axios.get(`${API_URL}/api/signup/${object.username}/${object.firstname}/${object.lastname}`)
      .then(response => {
        push('/measurements')
        dispatch({
          type: 'signup',
          payload: response.data
        })
      })
      .catch(err => {
        if(err.request.status === 409) {
          dispatch({
            type: 'fail',
            payload: err.request.response
          })
        } else if (err.request.status === 422) {
          dispatch({
            type: 'fail',
            payload: err.request.response
          })
        } else {
          dispatch({
            type: 'fail',
            payload: 'Couldn\'t signup; server error'
          })
        }
      })
    } else {
      dispatch({
        type: 'fail',
        payload: 'All fields have to be filled'
      })
    }
  }
}

export default connect(state => state, { signup })(Signup)