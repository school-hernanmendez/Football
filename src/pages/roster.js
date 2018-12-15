import React, { Component } from 'react'
import axios from 'axios'

export default class Roster extends Component {
  constructor() {
    super()
    this.state = {
      status: 'login',
      studentData: []
    }
  }

  getStudents() {

  }

  deleteStudent() {

  }

  openStudent() {

  }

  render() {
    if (this.state.status === 'login') {
      return (
        <div className="Roster-login">
        </div>
      )
    } else if(this.state.status === 'student') {
      return (
        <div className="Roster-student">

        </div>
      )
    }
    return (
      <div className="roster">
      </div>
    )
  }
}