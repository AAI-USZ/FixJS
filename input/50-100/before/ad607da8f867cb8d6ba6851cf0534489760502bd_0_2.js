function() {
  this.cleanUpIncompleteConnection_();
  if (!this.isConnected()) return;
  this.state_ = goog.net.xpc.ChannelStates.CLOSED;
  this.transport_.dispose();
  this.transport_ = null;
  this.connectCb_ = null;
  goog.net.xpc.logger.info('Channel "' + this.name + '" closed');
}