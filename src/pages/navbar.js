import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <div classname="navbar">
        <img src={`${window.location.origin}/logo.svg`} alt="logo" classname="sm-logo" />
      </div>
    )
  }
}