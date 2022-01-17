function doReconnect() {
    //
    // Cleanup and recreate the socket associated
    // with this instance.
    //
    self.retry.waiting = true;
    self.socket.removeAllListeners();
    self.socket = common.createSocket(self._options);
    
    //
    // Cleanup reconnect logic once the socket connects
    //
    self.socket.once('connect', function () {
      self.retry.waiting = false;
      self.retry.retries = 0;
    });
    
    //
    // Attempt to reconnect the socket
    //
    self._setup();
    self.connect();
  }