function() {
  // check if the connected iframe ready
  if (!(this.isRcvFrameReady_(this.getMsgFrameName_()) &&
        this.isRcvFrameReady_(this.getAckFrameName_()))) {
    goog.net.xpc.logger.finest('foreign frames not (yet) present');

    if (this.channel_.getRole() == goog.net.xpc.CrossPageChannelRole.INNER) {
      // The outer peer might need a short time to get its frames ready, as
      // CrossPageChannel prevents them from getting created until the inner
      // peer's frame has thrown its loaded event.  This method is a noop for
      // the first few times it's called, and then allows the reconnection
      // sequence to begin.
      this.maybeInnerPeerReconnect_();
    } else if (this.channel_.getRole() ==
               goog.net.xpc.CrossPageChannelRole.OUTER) {
      // The inner peer is either not loaded yet, or the receiving
      // frames are simply missing. Since we cannot discern the two cases, we
      // should scan for a reconnect message from the inner peer.
      this.outerPeerReconnect_();
    }

    // start a timer to check again
    this.getWindow().setTimeout(goog.bind(this.connect, this), 100);
  } else {
    goog.net.xpc.logger.fine('foreign frames present');

    // Create receivers.
    this.msgReceiver_ = new goog.net.xpc.IframePollingTransport.Receiver(
        this,
        this.getPeerFrame_(this.getMsgFrameName_()),
        goog.bind(this.processIncomingMsg, this));
    this.ackReceiver_ = new goog.net.xpc.IframePollingTransport.Receiver(
        this,
        this.getPeerFrame_(this.getAckFrameName_()),
        goog.bind(this.processIncomingAck, this));

    this.checkLocalFramesPresent_();
  }
}