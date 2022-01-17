function _onNewClient(data) {
    var scopeId = data.scopeId,
        clientId = data.clientId;
    log.debug("[CA] = Got new client: " + clientId);
    var clientPC = new CA.PeerConnection(CA.selectedMic, CA.selectedCam);
    clientPC.makeAnOffer(function (offerDetails) {
      CA.RealtimeTransport.emitOffer(CA.joinedScope, clientId, offerDetails);
    });
    clients[clientId] = clientPC;
  }