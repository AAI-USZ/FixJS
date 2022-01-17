function() {
  goog.net.xpc.logger.info('continueConnection_()');
  this.peerWindowDeferred_ = null;
  if (this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID]) {
    this.iframeElement_ = this.domHelper_.getElement(
        this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID]);
  }
  if (this.iframeElement_) {
    var winObj = this.iframeElement_.contentWindow;
    // accessing the window using contentWindow doesn't work in safari
    if (!winObj) {
      winObj = window.frames[this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID]];
    }
    this.setPeerWindowObject(winObj);
  }

  // if the peer window object has not been set at this point, we assume
  // being in an iframe and the channel is meant to be to the containing page
  if (!this.peerWindowObject_) {
    // throw an error if we are in the top window (== not in an iframe)
    if (window == window.top) {
      throw Error(
          "CrossPageChannel: Can't connect, peer window-object not set.");
    } else {
      this.setPeerWindowObject(window.parent);
    }
  }

  this.createTransport_();

  this.transport_.connect();

  // Now we run any deferred deliveries collected while connection was deferred.
  while (this.deferredDeliveries_.length > 0) {
    this.deferredDeliveries_.shift()();
  }
}