function() {
  this.close();

  this.peerWindowObject_ = null;
  this.iframeElement_ = null;
  delete goog.net.xpc.channels_[this.name];
  goog.dispose(this.peerLoadHandler_);
  delete this.peerLoadHandler_;
  goog.base(this, 'disposeInternal');
}