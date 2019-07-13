import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { adicionarTweet } from '../../actions/tweetActions'

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

  handlerSubmit = async (event) => {
    const {
      adicionarTweet
    } = this.props

    event.preventDefault()

    this.setState({
      texto: ''
    })
    const resposta = await axios.post(`http://react-api-edp.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
      conteudo: this.state.texto,
      login: 'wendellturmina'
    })
    adicionarTweet(resposta.data)
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    adicionarTweet
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(TweetForm)