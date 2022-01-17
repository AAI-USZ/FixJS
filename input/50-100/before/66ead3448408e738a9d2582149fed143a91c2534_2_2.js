function(service, payload) {
    goog.net.xpc.logger.fine('send(): payload=' + payload +
                             ' to hostname=' + this.peerHostname_);
    obj.postMessage(this.channel_.name + '|' + service + ':' + payload,
                    this.peerHostname_);
  }