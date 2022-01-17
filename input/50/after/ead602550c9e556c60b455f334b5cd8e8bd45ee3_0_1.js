function (data, accept) {
  console.log('%@', data)
  data.sessionID        = data.params.session
  users[data.sessionID] = data.params.AiOID

  accept(null, true)
}