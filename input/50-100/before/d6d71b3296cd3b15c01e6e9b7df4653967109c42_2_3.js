function _onOffer(clientId, offer) {
    log.debug("Got an offer from client with id: " + clientId);
    var clientPC = new CA.PeerConnection();
    clientPC.doAnswer(offer, function (answerDetails) {
      CA.RealtimeTransport.emitAnswer(CA.joinedScope, clientId, answerDetails)
    });
    clients[clientId] = clientPC;
  }