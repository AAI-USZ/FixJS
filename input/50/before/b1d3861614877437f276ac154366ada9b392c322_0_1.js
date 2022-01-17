function() {    
    // Set connected
    self.connected = true;
    // Emit the connect event with no error
    self.emit("connect", null, self);
  }