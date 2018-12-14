import React, { Component } from 'react';
import { connect } from 'react-redux'

class Navbar extends Component {
  render() {
    if(this.props.type === "measurements") {
      return (
      <div className="navbar-wrapper">
        <div className="navbar f-c">
          <span className="text" style={{ fontSize: '20px'}}>Measurements</span>
        </div>
      </div>
      )
    }
    return (
      <div className="navbar-wrapper">
        <div className="navbar">
        <span className="text">Hi {this.props.firstname}</span>
        <button className="measures" onClick={() => {
          this.props.push('/measurements')
        }}>Measurements</button>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Navbar)