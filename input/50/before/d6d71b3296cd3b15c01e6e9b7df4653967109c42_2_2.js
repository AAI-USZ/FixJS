function _onAnswer(clientId, answer) {
    log.debug("Got an answer from client with id: " + clientId);
    var clientPC = clients[clientId];
    clientPC.handleAnswer(answer);
  }