function(payload) {
  var transportParts =
      goog.net.xpc.NativeMessagingTransport.parseTransportPayload_(payload);
  var transportMessageType = transportParts[0];
  var peerEndpointId = transportParts[1];
  switch (transportMessageType) {
    case goog.net.xpc.SETUP_ACK_:
      this.setPeerProtocolVersion_(1);
      if (!this.setupAckReceived_.hasFired()) {
        this.setupAckReceived_.callback(true);
      }
      break;
    case goog.net.xpc.SETUP_ACK_NTPV2:
      if (this.protocolVersion_ == 2) {
        this.setPeerProtocolVersion_(2);
        if (!this.setupAckReceived_.hasFired()) {
          this.setupAckReceived_.callback(true);
        }
      }
      break;
    case goog.net.xpc.SETUP:
      this.setPeerProtocolVersion_(1);
      this.sendSetupAckMessage_(1);
      break;
    case goog.net.xpc.SETUP_NTPV2:
      if (this.protocolVersion_ == 2) {
        var prevPeerProtocolVersion = this.peerProtocolVersion_;
        this.setPeerProtocolVersion_(2);
        this.sendSetupAckMessage_(2);
        if ((prevPeerProtocolVersion == 1 || this.peerEndpointId_ != null) &&
            this.peerEndpointId_ != peerEndpointId) {
          // Send a new SETUP message since the peer has been replaced.
          goog.net.xpc.logger.info('Sending SETUP and changing peer ID to: ' +
              peerEndpointId);
          this.sendSetupMessage_();
        }
        this.peerEndpointId_ = peerEndpointId;
      }
      break;
  }
}