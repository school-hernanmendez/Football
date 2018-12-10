import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

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
      <div className="wrap intro">
        <img className="logo-main" src="https://carefair.herokuapp.com/static/CHS.png" alt="chs-logo" />
        <div>
          <p>Username</p>
          <input className="input main" onChange={e => this.change(e.target.value, 'username')} value={this.state.username}/>
          <p>First name</p>
          <input className="input main" onChange={e => this.change(e.target.value, 'firstname')} value={this.state.firstname}/>
          <p>Last name</p>
          <input className="input main" onChange={e => this.change(e.target.value, 'lastname')} value={this.state.lastname}/>
          <p>{this.props.message} </p>
          <button onClick={() => this.signup()}>Sign up</button>
          <Link to="/"><button>Back to Log in</button></Link>
        </div>
      </div>
    )
  }
}

function signup(object, push) {
  return dispatch => {
    axios.get(`http://localhost:8080/api/signup/${object.username}/${object.firstname}/${object.lastname}`)
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
  }
}

export default connect(state => state, { signup })(Signup)