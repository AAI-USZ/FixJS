function(error) {
    self.emit('error', error);
    cleanupWebsocketResources.call(this, error);
  }