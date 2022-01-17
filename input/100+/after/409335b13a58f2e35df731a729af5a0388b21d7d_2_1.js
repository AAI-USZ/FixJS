function(err) {
    client.removeAllListeners('open');
    self.emit('clientError', err);
  }