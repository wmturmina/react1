import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import TweetForm from '../../components/TweetForm'
import Modal from '../../components/Modal'

import { carregaTweets, removerNotificacao } from '../../actions/tweetActions'

class Home extends Component {
  componentDidMount(){
    this.getTweets()
  }

  getTweets = async () => {
    const {
      carregaTweets
    } =  this.props
    const resposta = await axios.get(`http://react-api-edp.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
    carregaTweets(resposta.data)
  }

  render() {
    const {
      listaTweets,
      tweetSelecionado,
      notificacao,
      removerNotificacao
    } = this.props

    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <TweetForm
              />
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <div className="tweetsArea">
                {listaTweets.length === 0 &&
                  <h4>Nenhum Tweet encontrado</h4>
                }
                {
                  listaTweets.map((item, key) => {
                    return (
                      <Tweet
                        key={key}
                        usuario={item.usuario}
                        conteudo={item.conteudo}
                        likeado={item.likeado}
                        removivel={item.removivel}
                        totalLikes={item.totalLikes}
                        id={item._id}
                      />
                    )
                  })
                }
              </div>
            </Widget>
          </Dashboard>
        </div>
        {tweetSelecionado &&
          <Modal>
            <Tweet
              usuario={tweetSelecionado.usuario}
              conteudo={tweetSelecionado.conteudo}
              likeado={tweetSelecionado.likeado}
              removivel={tweetSelecionado.removivel}
              totalLikes={tweetSelecionado.totalLikes}
              id={tweetSelecionado._id}
              likes={tweetSelecionado.likes}
              inModal
            />
          </Modal>
        }
        {notificacao &&
          <div
            className="notificacaoMsg"
            onAnimationEnd={() => removerNotificacao()}
          >
            {notificacao}
          </div>
        }
      </Fragment>
    )
  }
}

function mapStateToProps (state) {
  return {
    listaTweets: state.tweets.listaTweets,
    tweetSelecionado: state.tweets.tweetSelecionado,
    notificacao: state.notificacao
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    carregaTweets,
    removerNotificacao
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
