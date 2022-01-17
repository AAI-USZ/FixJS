function (data, accept) {
  data.sessionID        = data.params.session
  users[data.sessionID] = data.params.AiOID

  accept(null, true)
}