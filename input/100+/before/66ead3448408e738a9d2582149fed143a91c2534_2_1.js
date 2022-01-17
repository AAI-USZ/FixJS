function(channel, peerHostname,
    opt_domHelper, opt_oneSidedHandshake) {
  goog.base(this, opt_domHelper);

  /**
   * The channel this transport belongs to.
   * @type {goog.net.xpc.CrossPageChannel}
   * @private
   */
  this.channel_ = channel;

  /**
   * The hostname of the peer. This parameterizes all calls to postMessage, and
   * should contain the precise protocol, domain, and port of the peer window.
   * @type {string}
   * @private
   */
  this.peerHostname_ = peerHostname || '*';

  /**
   * The event handler.
   * @type {!goog.events.EventHandler}
   * @private
   */
  this.eventHandler_ = new goog.events.EventHandler(this);

  /**
   * Timer for connection reattempts.
   * @type {!goog.Timer}
   * @private
   */
  this.maybeAttemptToConnectTimer_ = new goog.Timer(100, this.getWindow());

  /**
   * Whether one-sided handshakes are enabled.
   * @type {boolean}
   * @private
   */
  this.oneSidedHandshake_ = !!opt_oneSidedHandshake;

  /**
   * Fires once we've received our SETUP_ACK message.
   * @type {!goog.async.Deferred}
   * @private
   */
  this.setupAckReceived_ = new goog.async.Deferred();

  /**
   * Fires once we've sent our SETUP_ACK message.
   * @type {!goog.async.Deferred}
   * @private
   */
  this.setupAckSent_ = new goog.async.Deferred();

  /**
   * Fires once we're marked connected.
   * @type {!goog.async.Deferred}
   * @private
   */
  this.connected_ = new goog.async.Deferred();

  // We don't want to mark ourselves connected until we have sent whatever
  // message will cause our counterpart in the other frame to also declare
  // itself connected, if there is such a message.  Otherwise we risk a user
  // message being sent in advance of that message, and it being discarded.
  if (this.oneSidedHandshake_) {
    if (this.channel_.getRole() == goog.net.xpc.CrossPageChannelRole.INNER) {
      // One sided handshake, inner frame:
      // SETUP_ACK must be received.
      this.connected_.awaitDeferred(this.setupAckReceived_);
    } else {
      // One sided handshake, outer frame:
      // SETUP_ACK must be sent.
      this.connected_.awaitDeferred(this.setupAckSent_);
    }
  } else {
    // Two sided handshake:
    // SETUP_ACK has to have been received, and sent.
    this.connected_.awaitDeferred(this.setupAckReceived_);

    // TODO(dbk): Restore this line.  It is necessary to guarantee that the
    // peer frame is in the connected state when it receives its first message,
    // but prevents cases where the peer disappears and reconnects.
    // this.connected_.awaitDeferred(this.setupAckSent_);
  }
  this.connected_.addCallback(this.notifyConnected_, this);
  this.connected_.callback(true);

  this.eventHandler_.
      listen(this.maybeAttemptToConnectTimer_, goog.Timer.TICK,
          this.maybeAttemptToConnect_);
}