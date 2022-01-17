function reconnect() {
  var self = this;
  
  //
  // Helper function containing the core reconnect logic
  //
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
  
  //
  // Helper function which attempts to retry if
  // it is less than the maximum
  //
  function tryReconnect() {
    self.retry.retries++;
    if (self.retry.retries >= self.retry.max) {
      return self.emit('error', new Error('Did not reconnect after maximum retries: ' + self.retry.max));
    }
    
    doReconnect();
  }
  
  this.retry.wait = this.retry.interval * Math.pow(10, this.retry.retries);
  setTimeout(tryReconnect, this.retry.wait);
}