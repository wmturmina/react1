import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/LoginPage'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
