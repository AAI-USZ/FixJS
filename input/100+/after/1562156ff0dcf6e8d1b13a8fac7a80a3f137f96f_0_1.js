function (w, $) {

  /**
   *
   * @param localAudioStream
   * @param localVideoStream
   * @constructor
   */
  CA.PeerConnection = function (localAudioStream, localVideoStream) {
    log.debug("[PC] = Creating new PeerConnection");
    this._nativePC = new webkitPeerConnection00(null,
        this._createProxy('_onLocalIceCandidate'));
    this._nativePC.onconnecting =
        this._createProxy('_onPeerConnectionConnecting');
    this._nativePC.onopen =
        this._createProxy('_onPeerConnectionOpen');
    this._nativePC.onaddstream =
        this._createProxy('_onPeerConnectionStreamAdded');
    this._nativePC.onremovestream =
        this._createProxy('_onPeerConnectionStreamRemoved');
    this._offerReadyHandler = function (arg1) {
    };
    this._answerReadyHandler = function (arg1) {
    };
    this._nativePC.addStream(localAudioStream);
    this._nativePC.addStream(localVideoStream);

    /**
     *
     * @type {String}
     */
    this.state = CA.PeerConnection.ConnectionState.NOT_CONNECTED;
    log.debug("[PC] = PeerConnection created");
  };

  /**
   *
   * @enum {Object}
   */
  CA.PeerConnection.ConnectionState = {

    /**
     * Initial state - after constructor and close
     */
    NOT_CONNECTED:'NOT_CONNECTED',

    /**
     * After sending an offer, before receiving an answer.
     */
    CONNECTING:'CONNECTING',

    /**
     * After receiving an offer and preparing answer to it;
     * After receiving an answer.
     */
    CONNECTED:'CONNECTED'
  };

  /**
   *
   * @param {Function}readyHandler
   */
  CA.PeerConnection.prototype.makeAnOffer = function (readyHandler) {
    log.debug("[PC] = Preparing an offer");
    this._endpoints = [];
    this._offeringClient = true;
//    WTF apprtc uses here object with 2 booleans and the pc1 uses null
//    this._offer = this._nativePC.createOffer({audio:true, video:true});
    this._offer = this._nativePC.createOffer(null);
    this._nativePC.setLocalDescription(this._nativePC.SDP_OFFER, this._offer);
    this._nativePC.startIce();
    this._offerReadyHandler = readyHandler;
    this.state = CA.PeerConnection.ConnectionState.CONNECTING;
    log.debug("[PC] = Offer prepared; waiting for ICE endpoints");
  };

  /**
   *
   * @param {CA.ClientDetails} offer
   * @param {Function} readyHandler
   */
  CA.PeerConnection.prototype.doAnswer = function (offer, readyHandler) {
    log.debug("[PC] = Preparing an answer");
    this._offeringClient = false;
    this._offerReadyHandler = readyHandler;

//    1. Handle the input - set remote description and ICE candidates
    var offerDescr = new SessionDescription(offer.sdp);
    this._nativePC.setRemoteDescription(this._nativePC.SDP_OFFER, offerDescr);
    for (var i = 0; i < offer.endpoints.length; i++) {
      /**
       * @type {CA.ClientEndpoint}
       */
      var endp = offer.endpoints[i];
      this._nativePC.processIceMessage(new IceCandidate(endp.label, endp.sdp));
    }

//    2. Prepare an answer
    this._answer = this._nativePC.createAnswer(
        offerDescr.toSdp(),
        {audio:true, video:true});

//    3. Start ICE. When it will be ready, we will issue the ready handler.
    this._nativePC.startIce();
    this.state = CA.PeerConnection.ConnectionState.CONNECTED;
    log.debug("[PC] = Answer prepared; waiting for ICE endpoints");

  };

  /**
   *
   * @param {CA.ClientDetails} answer
   */
  CA.PeerConnection.prototype.handleAnswer = function (answer) {
    log.debug("[PC] = Handling an answer");
    var answerDescr = new SessionDescription(answer.sdp);
    this._nativePC.setRemoteDescription(this._nativePC.SDP_OFFER, answerDescr);
    this.state = CA.PeerConnection.ConnectionState.CONNECTED;
    log.debug("[PC] = Answer processed. Connection between peers established");
  };


  CA.PeerConnection.prototype.close = function () {
    log.debug("[PC] = Closing an connection");
    this._nativePC.close();
    this.state = CA.PeerConnection.ConnectionState.NOT_CONNECTED;
  };

  //noinspection JSUnusedGlobalSymbols
  /**
   *
   * @param {IceCandidate} candidate
   * @param {Boolean} moreToFollow
   * @private
   */
  CA.PeerConnection.prototype._onLocalIceCandidate = function (candidate, moreToFollow) {
    if (candidate) {
      this._endpoints.push(new CA.ClientEndpoint(candidate));
    }
    if (!moreToFollow) {
      if (this._offeringClient) {
        this._offerReadyHandler(new CA.ClientDetails(this._offer.toSdp(), this._endpoints));
      } else {
//        Answering client
        this._answerReadyHandler(new CA.ClientDetails(this._answer.toSdp(), this._endpoints));
      }
    }

  };
  //noinspection JSUnusedGlobalSymbols
  CA.PeerConnection.prototype._onPeerConnectionConnecting = function (msg) {
    log.debug("PeerConnection Session connecting " + msg);
  };

  //noinspection JSUnusedGlobalSymbols
  CA.PeerConnection.prototype._onPeerConnectionOpen = function (msg) {
    log.debug("PeerConnection Session opened " + msg);
  };
  //noinspection JSUnusedGlobalSymbols
  CA.PeerConnection.prototype._onPeerConnectionStreamAdded = function (e) {
    log.debug("PeerConnection Stream Added: " + JSON.stringify(e));

  };
  //noinspection JSUnusedGlobalSymbols
  CA.PeerConnection.prototype._onPeerConnectionStreamRemoved = function (e) {
    log.debug("PeerConnection Stream Removed: " + JSON.stringify(e));
  };

  CA.PeerConnection.prototype._createProxy = function (method) {
    return $.proxy(CA.PeerConnection.prototype[method], this);
  };


  /**
   * Represents complete client media description. Contains the streams
   * description (SDP) as well as complete list of available network endpoints
   * (obtained from ICE);
   *
   * @param {String} sdp
   * @param {CA.ClientEndpoint[]} endpoints
   * @constructor
   */
  CA.ClientDetails = function (sdp, endpoints) {
    this.sdp = sdp;
    this.endpoints = endpoints;
  };

  /**
   * Represents a client ICE endpoint.
   *
   * @param {IceCandidate} candidate
   * @constructor
   */
  CA.ClientEndpoint = function (candidate) {
    this.label = candidate.label;
    this.sdp = candidate.toSdp();
  };


}