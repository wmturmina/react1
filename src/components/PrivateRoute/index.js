import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class PrivateRoute extends Component {
  render(){
    const Component = this.props.component
    const checkToken = localStorage.getItem('TOKEN')

    if (checkToken) {
      return (<Route render={() => <Component {...this.props} />} />)
    } else {
      return (<Redirect to="/login" />)
    }
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func
}

export default PrivateRoute