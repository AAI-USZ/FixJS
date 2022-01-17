function() {
  this.cleanUpIncompleteConnection_();
  this.state_ = goog.net.xpc.ChannelStates.CLOSED;
  goog.dispose(this.transport_);
  this.transport_ = null;
  this.connectCb_ = null;
  goog.dispose(this.connectionDelay_);
  this.connectionDelay_ = null;
  goog.net.xpc.logger.info('Channel "' + this.name + '" closed');
}