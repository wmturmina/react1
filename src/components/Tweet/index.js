import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import './tweet.css'

class Tweet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likeado: props.likeado || false,
      totalLikes: props.totalLikes || 0
    }
  }
  handlerLike = async (event) => {
    event.preventDefault()

    let {
      likeado,
      totalLikes
    } = this.state

    await axios.post(`http://react-api-edp.herokuapp.com/tweets/${this.props.id}/like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)

    this.setState({
      likeado: !likeado,
      totalLikes: !likeado ? ++totalLikes: --totalLikes
    })
  }

  handlerRemove = () => {
    const {
      id,
      onRemove
    } = this.props
    onRemove(id)
  }

  handlerSelect = () => {
    const {
      onSelect,
      id,
      inModal
    } = this.props
    if (!inModal)
      onSelect(id)
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
      }
    } = this.props
    const {
      likeado,
      totalLikes
    } = this.state

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
  onRemove: PropTypes.func.isRequired,
  likes: PropTypes.array,
  inModal: PropTypes.bool,
  usuario: PropTypes.shape({
    login: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    sobrenome: PropTypes.string,
    foto: PropTypes.string,
    email: PropTypes.string
  }),
  onSelect: PropTypes.func
}

Tweet.defaultProps = {
  inModal: false
}

export default Tweet