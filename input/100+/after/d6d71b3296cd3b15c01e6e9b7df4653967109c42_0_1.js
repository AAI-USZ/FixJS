function (offer, readyHandler) {
    log.debug("[PC] = Preparing an answer");
    this._offeringClient = false;
    this._offerReadyHandler = readyHandler;

//    1. Handle the input - set remote description and ICE candidates
    var offerDescr = new SessionDescription(offer.sdp);
    this._nativePC.setRemoteDescription(this._nativePC.SDP_OFFER, offerDescr);

    //    2. Prepare an answer
    this._answer = this._nativePC.createAnswer(
        offerDescr.toSdp(),
        {audio:true, video:true});

//    3. Start ICE. When it will be ready, we will issue the ready handler.
//    this._nativePC.startIce();
    for (var i = 0; i < offer.endpoints.length; i++) {
      /**
       * @type {CA.ClientEndpoint}
       */
      var endp = offer.endpoints[i];
      this._nativePC.processIceMessage(new IceCandidate(endp.label, endp.sdp));
    }
    var self = this;
    setTimeout(function () {
      readyHandler(new CA.ClientDetails(self._answer.toSdp(), []));
    }, 500);

    this.state = CA.PeerConnection.ConnectionState.CONNECTING;
    log.debug("[PC] = Answer prepared; waiting for ICE endpoints");

  }