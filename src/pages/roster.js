import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from '../var'

import Navbar from './navbar'

export default class Roster extends Component {
  constructor() {
    super()
    this.state = {
      status: 'login',
      studentData: [],
      pass: '',
      error: '',
      question: false,
      selectedStudent: {}
    }

    this.login = this.login.bind(this)
    this.getStudents = this.getStudents.bind(this)
  }

  getStudents() {
    axios.get(`${API_URL}/api/all`)
      .then(r => {
        this.setState({ studentData: r.data })
      })
      .catch(err => {
        console.error(err)
        if(err.request) {
          this.setState({ error: 'Server error, refresh page'})
        } else {
          this.setState({ error: 'Error, refresh page' })
        }
      })
  }

  deleteStudent() {
    axios.get(`${API_URL}/api/delete/${this.state.selectedStudent._id}`)
    .then(r => {
      this.setState({ studentData: r.data, status: 'default' })
    })
    .catch(err => {
      console.error(err)
      if(err.request) {
        this.setState({ error: 'Server error, try again'})
      } else {
        this.setState({ error: 'Error, refresh page' })
      }
    })
  }

  login() {
    if (this.state.pass === '') {
      this.setState({ status: 'default' })
    }
  }

  componentDidMount() {
    this.getStudents()
  }

  render() {
    if (this.state.status === 'login') {
      return (
        <div className="Roster-login">
          <form onSubmit={e => {e.preventDefault(); this.login()}}>
            <p>Password</p>
            <input value={this.state.pass} type="password" onChange={e => this.setState({ pass: e.target.value})} className="input"/>
            <input type="submit" value="login" className="submit empty-btn"/>
          </form>
        </div>
      )
    } else if(this.state.status === 'student') {
      const s = this.state.selectedStudent
      return (
        <div className="Roster-student">
          <Navbar history={this.props.history} status={this.state.status} back={() => this.setState({ status: 'default' })} type="roster" />
          <p>{this.state.error}</p>
          <div className="div-s">
            <p className="info">{s.firstname} {s.lastname}<span className="big-usrname">    {s.username}</span></p>
            <p className="roster-measurements-s">
              <span>Height:</span> {s.height.feet}'{s.height.inches}"  <span>Weight:</span> {s.weight}lbs
            </p>
            <p className="text">Max for each workout</p>
            <div className="r-workouts">
              {
                Object.keys(s.workouts).filter(i => {
                  return s.workouts[i].type !== 'no'
                }).sort((a,b) => {
                  const an = s.workouts[a].type === 'n' ? 1 : 0
                  const bn = s.workouts[b].type === 'n' ? 1 : 0
                  return an - bn
                }).map(i => {
                  return (
                    <div key={i}>
                      {i.replace(/_/g, ' ').replace(/^(.)|\s(.)/g, ($1) => $1.toUpperCase())}{s.workouts[i].type === 'lbs' && ' (lbs)'}
                      <span>{s.workouts[i].num}</span>
                    </div>
                  )
                })
              }
            </div>
            <div className="delete-s" onClick={this.state.question ? () => {}:() => this.setState({ question: true })}>
            Delete Student
            <span className={`sure ${this.state.question ? '' : 'hidden'}`}>
              Sure? 
              <button className="left" onClick={() => this.deleteStudent()}>Yes</button><button className="right" onClick={() => this.setState({ question: false })}>No</button>
            </span>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="roster">
        <Navbar history={this.props.history} status={this.state.status} type="roster"/>
        <p>{this.state.error}</p>
        <div className="div">
          <p>Roster</p>
          <div className="students">
            {
              this.state.studentData.map(i => {
                const { firstname, lastname, username, height, weight } = i
                return (
                  <div key={username} onClick={() => this.setState({ selectedStudent: i, status: 'student' })}>
                    <p><p>{firstname} {lastname}</p><span className="usrname">{username}</span></p>
                    <p className="roster-measurements">{height.feet}'{height.inches}" {weight}lbs</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}