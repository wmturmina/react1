import React, { Component, Fragment } from 'react';
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
    this.getTweets()
  }

  getTweets = () => {
    fetch('http://10.200.24.101:3001/tweets')
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

  adicionarTweet = (novoTweet) => {
    const {
      listaTweets
    } = this.state
    this.setState({
      listaTweets: [
        ...listaTweets,
        novoTweet
      ]
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
