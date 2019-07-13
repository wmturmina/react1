import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './modal.css'

import { fechaTweet } from '../../actions/tweetActions'

class Modal extends Component {
  render() {
    const {
      children,
      fechaTweet
    } = this.props
    return (
      <div className="modal modal--isAtivo" onClick={fechaTweet}>
        <div className="modal_wrap">
          {children}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fechaTweet
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Modal)