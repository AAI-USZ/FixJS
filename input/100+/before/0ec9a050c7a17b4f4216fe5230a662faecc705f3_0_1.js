function(id, opt_force) {
  var request = this.requests_.get(id);
  if (request) {
    var xhrIo = request.xhrIo;
    request.setAborted(true);
    if (opt_force) {
      // We remove listeners to make sure nothing gets called if a new request
      // with the same id is made.
      this.removeXhrListener_(xhrIo, request.getXhrEventCallback());
      goog.events.listenOnce(
          xhrIo,
          goog.net.EventType.READY,
          function() { this.xhrPool_.releaseObject(xhrIo); },
          false,
          this);
      this.requests_.remove(id);
    }
    if (xhrIo) {
      xhrIo.abort();
    }
  }
}