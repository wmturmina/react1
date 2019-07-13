import { createStore, combineReducers } from 'redux'

function notificacaoReducer(state = '', action = {}) {
  let notificacaoAtual = state
  if (action.type === 'ADD_NOTIFICACAO') {
    notificacaoAtual = action.payload
  }

  if (action.type === 'REMOVE_NOTIFICACAO') {
    notificacaoAtual = null
  }
  return notificacaoAtual
}

function tweetsReducer (state = {listaTweets: [], tweetSelecionado: null}, action){
  let stateLocal = state.listaTweets
  let tweetSelecionadoLocal = state.tweetSelecionado
  switch (action.type) {
    case 'CARREGAR_TWEET':
      stateLocal = action.payload
      break

    case 'ADICIONAR_TWEET':
      stateLocal = [
        action.payload,
        ...stateLocal
      ]
      break

    case 'REMOVER_TWEET':
      stateLocal = stateLocal.filter(item => item._id !== action.payload)
      break

    case 'LIKE_TWEET':
      stateLocal = stateLocal.map(item => {
        let itemLocal = item
        if (itemLocal._id === action.payload) {
          itemLocal = {
            ...itemLocal,
            likeado: !itemLocal.likeado,
            totalLikes: !itemLocal.likeado ? ++itemLocal.totalLikes : --itemLocal.totalLikes
          }
        }
        return itemLocal
      })
      break

    case 'ABRE_TWEET':
      tweetSelecionadoLocal= stateLocal.find(item => item._id === action.payload)
      break

    case 'FECHA_TWEET':
      tweetSelecionadoLocal = null
      break
  
    default:
      break
  }
  return {
    listaTweets: stateLocal,
    tweetSelecionado: tweetSelecionadoLocal
  }
}

export default createStore(
  combineReducers({
    tweets: tweetsReducer,
    notificacao: notificacaoReducer
  })
)