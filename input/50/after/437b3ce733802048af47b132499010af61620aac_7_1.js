function(msg) {
    this._LOG.send(msg.type);
    window.setZeroTimeout(function() {
      TMB.__receiveMessage(msg);
    });
  }