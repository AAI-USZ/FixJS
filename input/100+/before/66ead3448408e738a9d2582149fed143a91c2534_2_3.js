function(payload) {
  switch (payload) {
    case goog.net.xpc.SETUP:
      this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP_ACK_);
      if (!this.setupAckSent_.hasFired()) {
        this.setupAckSent_.callback(true);
      }
      break;
    case goog.net.xpc.SETUP_ACK_:
      if (!this.setupAckReceived_.hasFired()) {
        this.setupAckReceived_.callback(true);
      }
      break;
  }
}