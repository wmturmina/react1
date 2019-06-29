import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TweetForm extends Component {
  constructor() {
    super()
    this.state = {
      texto: ''
    }
  }

  handlerOnChange = (event) => {
    this.setState({
      texto: event.target.value
    })
  }

  handlerSubmit = (event) => {
    event.preventDefault()
    this.setState({
      texto: ''
    })
    this.props.onSave({
      usuario: {
        login: 'wendellturmina',
        nome: 'Wendell',
        sobrenome: 'Turmina',
        email: 'wendell.turmina@e-deploy.com.br'
      },
      conteudo: this.state.texto
    })
  }

  render() {
    const {
      texto
    } = this.state
    return (
      <form className="novoTweet">
        <div className="novoTweet__editorArea">
          <span className={`novoTweet__status
                ${texto.length > 10
              ? 'novoTweet__status--invalido'
              : ''}`
          }>{texto.length}/140</span>
          <textarea
            className="novoTweet__editor"
            placeholder="O que está acontecendo?"
            onChange={this.handlerOnChange}
            value={texto}
          >
          </textarea>
        </div>
        <button
          onClick={this.handlerSubmit}
          disabled={texto.length > 10}
          type="submit"
          className="novoTweet__envia"
        >
          Tweetar
          </button>
      </form>
    )
  }
}

TweetForm.propTypes = {
  onSave: PropTypes.func.isRequired
}

/*
TweetForm.defaultProps = {
  onSave: () => null
}
*/

export default TweetForm