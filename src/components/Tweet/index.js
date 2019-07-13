import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import './tweet.css'

import { removerTweet, abreTweet, likeTweet, adicionarNotificacao } from '../../actions/tweetActions'

class Tweet extends Component {
  handlerLike = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    const {
      id,
      likeTweet
    } = this.props
    await axios.post(`http://react-api-edp.herokuapp.com/tweets/${id}/like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
    likeTweet(id)
  }

  handlerRemove = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    const {
      id,
      removerTweet,
      adicionarNotificacao
    } = this.props

    await axios.delete(`http://react-api-edp.herokuapp.com/tweets/${id}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
    removerTweet(id)
    adicionarNotificacao('Tweet removido com sucesso!')
  }

  handlerSelect = () => {
    const {
      abreTweet,
      id,
      inModal
    } = this.props
    if (!inModal)
      abreTweet(id)
  }

  render() {
    const {
      conteudo,
      removivel,
      likes,
      inModal,
      usuario: {
        foto: thumb,
        nome,
        sobrenome,
        email,
        login
      },
      likeado,
      totalLikes
    } = this.props

    return (
      <article className="tweet" onClick={this.handlerSelect}>
        <div className="tweet__cabecalho">
          <img className="tweet__fotoUsuario" src={thumb} alt="" />
          <span className="tweet__nomeUsuario">{`${nome} ${sobrenome}`}</span>
          <a href={`mailto:${email}`}><span className="tweet__userName">@{login}</span></a>
        </div>
        <p className="tweet__conteudo">
          <span>{conteudo}</span>
        </p>
        <footer className="tweet__footer">
          <button className="btnLike btn btn--clean" onClick={this.handlerLike}>
            <svg className={`icon icon--small iconHeart ${likeado ? 'iconHeart--active' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5">
              <defs>
                <clipPath id="a">
                  <path d="M0 38h38V0H0v38z"></path>
                </clipPath>
              </defs>
              <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
                <path d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.632-8.018-4.128-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.773.098-1.52.266-2.242C2.75 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.47.268 2.241"></path>
              </g>
            </svg>
            {totalLikes}
          </button>
          {removivel && 
            <button onClick={this.handlerRemove} className="btn btn--blue btn--remove">
              x
            </button>
          }
          <div className="tweet__likeadores">
            {
              inModal &&
              likes.map((like) => `@${like.usuario.login}, `)
            }
          </div>
        </footer>
      </article>
    )
  }
}

Tweet.propTypes = {
  id: PropTypes.string,
  conteudo: PropTypes.string,
  likeado: PropTypes.bool,
  removivel: PropTypes.bool,
  totalLikes: PropTypes.number,
  likes: PropTypes.array,
  inModal: PropTypes.bool,
  usuario: PropTypes.shape({
    login: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    sobrenome: PropTypes.string,
    foto: PropTypes.string,
    email: PropTypes.string
  })
}

Tweet.defaultProps = {
  inModal: false
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removerTweet,
    abreTweet,
    likeTweet,
    adicionarNotificacao
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Tweet)