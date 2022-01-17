function() {

  // Are the sender frames ready?
  // These contain a document from the peer's domain, therefore we can only
  // check if the frame itself is present.
  var frames = this.channel_.getPeerWindowObject().frames;
  if (!(frames[this.getAckFrameName_()] &&
        frames[this.getMsgFrameName_()])) {
    // start a timer to check again
    if (!this.checkLocalFramesPresentCb_) {
      this.checkLocalFramesPresentCb_ = goog.bind(
          this.checkLocalFramesPresent_, this);
    }
    this.getWindow().setTimeout(this.checkLocalFramesPresentCb_, 100);
    goog.net.xpc.logger.fine('local frames not (yet) present');
  } else {
    // Create senders.
    this.msgSender_ = new goog.net.xpc.IframePollingTransport.Sender(
        this.sendUri_, this.msgWinObj_);
    this.ackSender_ = new goog.net.xpc.IframePollingTransport.Sender(
        this.sendUri_, this.ackWinObj_);

    goog.net.xpc.logger.fine('local frames ready');

    this.getWindow().setTimeout(goog.bind(function() {
      this.msgSender_.send(goog.net.xpc.SETUP);
      this.sentConnectionSetup_ = true;
      this.waitForAck_ = true;
      goog.net.xpc.logger.fine('SETUP sent');
    }, this), 100);
  }
}