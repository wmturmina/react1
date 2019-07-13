import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './modal.css'

class Modal extends Component {
  render() {
    const {
      children,
      onClose
    } = this.props
    return (
      <div className="modal modal--isAtivo" onClick={onClose}>
        <div className="modal_wrap">
          {children}
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  isAberto: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

Modal.defaultProps ={
  onClose: () => {}
}

export default Modal