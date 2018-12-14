import React, { Component } from 'react'
import axios from 'axios'

export default class Roster extends Component {
  constructor() {
    super()
    this.state = {
      status: 'login'
    }
  }

  render() {
    return (
      <div className="Roster">
      </div>
    )
  }
}