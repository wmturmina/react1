import React, { Component } from 'react'

class TweetForm extends Component {
  constructor(){
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
  
  render() {
    const {
      texto
    } = this.state
    return(
      <form className="novoTweet">
          <div className="novoTweet__editorArea">
              <span className={`novoTweet__status
                ${texto.length > 10
                ? 'novoTweet__status--invalido'
                : ''}`
            }>{texto.length}/140</span>
              <textarea className="novoTweet__editor" placeholder="O que está acontecendo?"
              onChange={this.handlerOnChange}>
              </textarea>
          </div>
          <button disabled={texto.length > 10} type="submit" className="novoTweet__envia">Tweetar</button>
      </form>
    )
  }
}

export default TweetForm