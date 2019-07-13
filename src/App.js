import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/LoginPage'

import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <PrivateRoute path="/" component={Home} exact />
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
