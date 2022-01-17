function _onNewClient(clientId) {
    log.debug("Got new client: " + clientId);
    var clientPC = new CA.PeerConnection();
    clientPC.makeAnOffer(function (offerDetails) {
      CA.RealtimeTransport.emitOffer(CA.joinedScope, clientId, offerDetails);
    });
    clients[clientId] = clientPC;
  }