import React, { Component } from 'react';
import { connect } from 'react-redux'

class Navbar extends Component {
  render() {
    if(this.props.type === "measurements") {
      return (
      <div className="navbar-wrapper">
        <div className="navbar f-c">
          <i className="material-icons back" onClick={() => this.props.history.goBack()}>chevron_left</i>
          <span className="text" style={{ fontSize: '20px'}}>Measurements</span>
        </div>
      </div>
      )
    }
    return (
      <div className="navbar-wrapper">
        <div className="navbar">
        <i className="material-icons back" onClick={() => this.props.history.goBack()}>chevron_left</i>
        <span className="text">Hi {this.props.firstname}</span>
        <button className="measures" onClick={() => {
          this.props.history.push('/measurements')
        }}>Measurements</button>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Navbar)