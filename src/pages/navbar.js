import React, { Component } from 'react';
import { connect } from 'react-redux'

class Navbar extends Component {
  componentDidMount() {
    window.addEventListener('resize', () => {
      this.forceUpdate()
    })
  }
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
    } else if(this.props.type === "roster") {
      const width = window.innerWidth
      const w = width - 64 - (width/3.4)
      return (
        <div className="navbar-wrapper">
          <div className="navbar-roster" style={{ background: `linear-gradient(45deg, #9030CE ${w}px, white ${w}px)` }}>
            <i onClick={() => this.props.back()} className={`material-icons x1 ${this.props.status === 'student' ? '' : 'x0'}`}>chevron_left</i><p>CHS Football Team</p>
            <img src="/logo.svg" alt="logo"/>
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