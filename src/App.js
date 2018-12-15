import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import { createStore, applyMiddleware } from 'redux'
import middle from 'redux-thunk'
import { Provider } from 'react-redux'

import Intro from './pages/intro'
import Signup from './pages/signup'
import SelectQ from './pages/selectQ'
import Workout from './pages/exercise'
import Measures from './pages/measurements'
import Custom from './pages/custom'
import CustomQ from './pages/customQ'

const initialState = {
  _id: '',
  username: '',
  firstname: '',
  lastname: '',
  message: '',
  day: '',
  quarter: 0,
  measures: {}
}

function reducer(state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state))
  switch(action.type) {
    case 'login':
      action.payload.message = ''
      action.payload.quarter = 0
      return action.payload
    case 'signup':
      action.payload.message = ''
      action.payload.quarter = 0
      return action.payload
    case 'change':
      action.payload.message = ''
      action.payload.quarter = 0
      return action.payload
    case 'fail':
      newState.message = action.payload
      return newState
    case 'qt':
      newState.quarter = action.payload
      return newState
    case 'custom-day':
      newState.cDay = action.payload
      return newState
    default:
      return state;
  }
}

const store = createStore(reducer, {}, applyMiddleware(middle))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/selectQ" component={SelectQ} />
            <Route path="/workouts" component={Workout} />
            <Route path="/measurements" component={Measures} />
            <Route path="/custom" component={Custom} />
            <Route path="/customQ" component={CustomQ} />
            <Route path="/" component={Intro} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
