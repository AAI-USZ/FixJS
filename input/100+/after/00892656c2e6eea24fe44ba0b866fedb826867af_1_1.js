function() {
  goog.net.xpc.logger.finest('outerPeerReconnect called');
  var frames = this.getPeerFrames_();
  var length = frames.length;
  for (var i = 0; i < length; i++) {
    var frameName;
    try {
      if (frames[i] && frames[i].name) {
        frameName = frames[i].name;
      }
    } catch (e) {
      // Do nothing.
    }
    if (!frameName) {
      continue;
    }
    var message = frameName.split('_');
    if (message.length == 3 &&
        message[0] == goog.net.xpc.IframePollingTransport.IFRAME_PREFIX &&
        message[1] == 'reconnect') {
      // This is a legitimate reconnect message from the peer. Start using
      // the peer provided channel name, and start a connection over from
      // scratch.
      this.channel_.name = message[2];
      this.deconstructSenderFrames_();
      this.initialized_ = false;
      break;
    }
  }
}