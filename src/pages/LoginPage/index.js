import React, { Component, Fragment, createRef } from 'react'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'

import './loginPage.css'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      erro: false
    }
    this.login = createRef()
    this.password = createRef()
  }
  handlerLogin = (event) => {
    event.preventDefault()
    const objLogin = {
      login: this.login.current.value,
      senha: this.password.current.value
    }
    fetch('http://10.200.24.101:3001/login', {
      method: 'POST',
      body: JSON.stringify(objLogin)
    })
      .then((response) => {
        if (!response.ok)
          throw response
        return response.json()
      })
      .then((retornoLogin) => {
        console.warn(retornoLogin)
        localStorage.setItem('TOKEN', retornoLogin.token)
      })
      .catch((error) => {
        console.warn(error)
        this.setState({
          erro: true
        })
      })
  }

  render() {
    const {
      erro
    } = this.state
    return (
      <Fragment>
        <Cabecalho />
        <div className="loginPage">
          <div className="container">
            <Widget>
              <h2 className="loginPage__title">Seja bem vindo!</h2>
              <form className="loginPage__form" action="/">
                <div className="loginPage__inputWrap">
                  <label className="loginPage__label" htmlFor="login">Login</label>
                  <input ref={this.login} className="loginPage__input" type="text" id="login" name="login" />
                </div>
                <div className="loginPage__inputWrap">
                  <label className="loginPage__label" htmlFor="senha">Senha</label>
                  <input ref={this.password} className="loginPage__input" type="password" id="senha" name="senha" />
                </div>
                {erro &&
                  <div className="loginPage__errorBox">
                    Mensagem de erro!
                  </div>
                }
                <div className="loginPage__inputWrap">
                  <button onClick={this.handlerLogin} className="loginPage__btnLogin" type="submit">
                    Logar
                  </button>
                </div>
              </form>
            </Widget>
          </div>
        </div>
      </Fragment>
    )
  }
}


export default LoginPage