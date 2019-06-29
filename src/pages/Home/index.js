import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import TweetForm from '../../components/TweetForm'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      listaTweets: []
    }
  }

  componentDidMount(){
    //this.getTweets()
    this.getTweets2()
  }

  getTweets = () => {
    fetch(`http://10.200.24.101:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
      .then((response) => {
        console.warn(response)
        return response.json()
      })
      .then((tweets) => {
        console.warn(tweets)
        this.setState({
          listaTweets: tweets
        })
      })
      .catch((erro) => {
        console.warn(erro)
      })
  }

  getTweets2 = () => {
    axios.get(`http://10.200.24.101:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
      .then((response) => {
        this.setState({
          listaTweets: response.data
        })
      })
  }

  adicionarTweet = (novoTweet) => {
    const {
      listaTweets
    } = this.state
    axios.post(`http://10.200.24.101:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
      conteudo: novoTweet.conteudo,
      login: novoTweet.usuario.login 
    })
      .then((response) => {
        this.setState({
          listaTweets: [
            response.data,
            ...listaTweets
          ]
        })
      })
  }

  adicionarTweet2 = async (novoTweet) => {
    const {
      listaTweets
    } = this.state
    const resposta = await axios.post(`http://10.200.24.101:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
      conteudo: novoTweet.conteudo,
      login: novoTweet.usuario.login
    })

    this.setState({
      listaTweets: [
        resposta.data,
        ...listaTweets
      ]
    })
  }

  handlerRemoveTweet = (id) => {
    const {
      listaTweets
    } = this.state
    axios.delete(`http://10.200.24.101:3001/tweets/${id}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
      .then((data) => {
        const listaAtualizada = listaTweets.filter(item => item._id !== id)
        this.setState({
          listaTweets: listaAtualizada
        })
      })
  }

  render() {
    const {
      listaTweets
    } = this.state

    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <TweetForm
                onSave={this.adicionarTweet}
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
                        onRemove={this.handlerRemoveTweet}
                      />
                    )
                  })
                }
              </div>
            </Widget>
          </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default Home;
