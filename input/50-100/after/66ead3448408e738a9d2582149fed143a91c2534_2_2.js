function(service, payload) {
    // In IE8 (and perhaps elsewhere), it seems like postMessage is sometimes
    // implemented as a synchronous call.  That is, calling it synchronously
    // calls whatever listeners it has, and control is not returned to the
    // calling thread until those listeners are run.  This produces different
    // ordering to all other browsers, and breaks this protocol.  This timer
    // callback is introduced to produce standard behavior across all browsers.
    var transport = this;
    var channelName = this.channel_.name;
    var sendFunctor = function() {
      transport.sendTimerId_ = 0;
      goog.net.xpc.logger.fine('send(): service=' + service + ' payload=' +
          payload + ' to hostname=' + transport.peerHostname_);
      obj.postMessage(channelName + '|' + service + ':' + payload,
          transport.peerHostname_);
    };
    this.sendTimerId_ = goog.Timer.callOnce(sendFunctor, 0);
  }