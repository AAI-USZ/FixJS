function (readyHandler) {
    log.debug("[PC] = Preparing an offer");
    this._endpoints = [];
    this._offeringClient = true;
    this._offer = this._nativePC.createOffer({audio:true, video:true});
    this._nativePC.setLocalDescription(this._nativePC.SDP_OFFER, this._offer);
    this._nativePC.startIce();
    this._offerReadyHandler = readyHandler;
    this.state = CA.PeerConnection.ConnectionState.CONNECTING;
    log.debug("[PC] = Offer prepared; waiting for ICE endpoints");
  }