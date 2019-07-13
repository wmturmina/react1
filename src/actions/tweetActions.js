export function carregaTweets(listaTweets) {
  return {
    type: 'CARREGAR_TWEET',
    payload: listaTweets
  }
}

export function adicionarTweet(novoTweet) {
  return {
    type: 'ADICIONAR_TWEET',
    payload: novoTweet
  }
}

export function removerTweet(idTweet) {
  return {
    type: 'REMOVER_TWEET',
    payload: idTweet
  }
}

export function likeTweet(idTweet) {
  return {
    type: 'LIKE_TWEET',
    payload: idTweet
  }
}

export function abreTweet(idTweet) {
  return {
    type: 'ABRE_TWEET',
    payload: idTweet
  }
}

export function fechaTweet() {
  return {
    type: 'FECHA_TWEET'
  }
}

export function adicionarNotificacao(mensagem) {
  return {
    type: 'ADD_NOTIFICACAO',
    payload: mensagem
  }
}

export function removerNotificacao() {
  return {
    type: 'REMOVE_NOTIFICACAO'
  }
}