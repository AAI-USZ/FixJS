function() {
  // In a one-sided handshake, the outer frame does not send a SETUP message,
  // but the inner frame does.
  var outerFrame = this.channel_.getRole() ==
      goog.net.xpc.CrossPageChannelRole.OUTER;
  if ((this.oneSidedHandshake_ && outerFrame) ||
      this.channel_.isConnected() ||
      this.isDisposed()) {
    this.maybeAttemptToConnectTimer_.stop();
    return;
  }
  this.maybeAttemptToConnectTimer_.start();
  this.sendSetupMessage_();
}