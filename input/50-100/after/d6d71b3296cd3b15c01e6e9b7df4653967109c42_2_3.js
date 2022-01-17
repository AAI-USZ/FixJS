function _onOffer(clientId, offer) {
    log.debug("[CA] = Got an offer from client with id: " + clientId);
    var clientPC = new CA.PeerConnection(CA.selectedMic, CA.selectedCam);
    clientPC.doAnswer(offer, function (answerDetails) {
      CA.RealtimeTransport.emitAnswer(CA.joinedScope, clientId, answerDetails)
    });
    clients[clientId] = clientPC;
  }