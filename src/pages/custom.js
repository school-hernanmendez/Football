import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './navbar'

class Custom extends Component {
  constructor() {
    super();
    this.select = this.select.bind(this)
  }
  select(day) {
    this.props.cDay(day, this.props.history.push)
  }
  render() {
    return(
      <div className="wrap page withnav">
        <Navbar history={this.props.history} />
        <p className="subtitle ninety day">Select day</p>
        <div className="quarter-wrap ninety day">
           <button className="quarter" onClick={() => this.select('Monday')}>Monday</button>
           <button className="quarter" onClick={() => this.select('Tuesday')}>Tuesday</button>
           <button className="quarter" onClick={() => this.select('Wednesday')}>Wednesday</button>
           <button className="quarter" onClick={() => this.select('Thursday')}>Thursday</button>
        </div>
      </div>
    )
  }
}

function cDay(day, push) {
  return dispatch => {
    dispatch({
      type: 'custom-day',
      payload: day
    })
    push('/customQ')
  }
}

export default connect(state => state, { cDay })(Custom)
