function() {
  // return, if the transport has already been created
  if (this.transport_) {
    return;
  }

  if (!this.cfg_[goog.net.xpc.CfgFields.TRANSPORT]) {
    this.cfg_[goog.net.xpc.CfgFields.TRANSPORT] =
        this.determineTransportType_();
  }

  switch (this.cfg_[goog.net.xpc.CfgFields.TRANSPORT]) {
    case goog.net.xpc.TransportTypes.NATIVE_MESSAGING:
      this.transport_ = new goog.net.xpc.NativeMessagingTransport(
          this,
          this.cfg_[goog.net.xpc.CfgFields.PEER_HOSTNAME],
          this.domHelper_,
          !!this.cfg_[goog.net.xpc.CfgFields.ONE_SIDED_HANDSHAKE]);
      break;
    case goog.net.xpc.TransportTypes.NIX:
      this.transport_ = new goog.net.xpc.NixTransport(this, this.domHelper_);
      break;
    case goog.net.xpc.TransportTypes.FRAME_ELEMENT_METHOD:
      this.transport_ =
          new goog.net.xpc.FrameElementMethodTransport(this, this.domHelper_);
      break;
    case goog.net.xpc.TransportTypes.IFRAME_RELAY:
      this.transport_ =
          new goog.net.xpc.IframeRelayTransport(this, this.domHelper_);
      break;
    case goog.net.xpc.TransportTypes.IFRAME_POLLING:
      this.transport_ =
          new goog.net.xpc.IframePollingTransport(this, this.domHelper_);
      break;
  }

  if (this.transport_) {
    goog.net.xpc.logger.info('Transport created: ' + this.transport_.getName());
  } else {
    throw Error('CrossPageChannel: No suitable transport found!');
  }
}