function() {    
    // Set connected
    self.connected = true;
    // Now that we are connected set the socket timeout
    self.connection.setTimeout(self.socketOptions.socketTimeoutMS != null ? self.socketOptions.socketTimeoutMS : self.socketOptions.timeout);
    // Emit the connect event with no error
    self.emit("connect", null, self);
  }