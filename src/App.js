import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import { createStore, applyMiddleware } from 'redux'
import middle from 'redux-thunk'
import { Provider } from 'react-redux'

import Intro from './pages/intro'
import Signup from './pages/signup'

const initialState = {
  _id: '',
  username: '',
  firstname: '',
  lastname: '',
  message: '',
  day: '',
  measures: {}
}

function reducer(state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state))
  switch(action.type) {
    case 'login':
      action.payload.message = ''
      console.log(action.payload)
      return action.payload
    case 'signup':
      action.payload.message = ''
      return action.payload
    case 'change_thing':
      newState.measures[action.payload.measurement] = action.payload.new
      return newState
    case 'fail':
      newState.message = action.payload
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
            <Route path="/" component={Intro} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
