function(callback) {
  var self = this;

  // Check that the user has not called this twice
  if(this.openCalled) {
    // Close db
    this.close();
    // Throw error
    throw new Error("db object already connecting, open cannot be called multiple times");
  }

  // If we have a specified read preference
  if(this.readPreference != null) this.serverConfig.setReadPreference(this.readPreference);

  // Set that db has been opened
  this.openCalled = true;
  // Set the status of the server
  self._state = 'connecting';
  // Set up connections
  if(self.serverConfig instanceof Server || self.serverConfig instanceof ReplSet || self.serverConfig instanceof Mongos) {
    self.serverConfig.connect(self, {firstCall: true}, function(err, result) {
      if(err != null) {
        // Set that db has been opened
        self.openCalled = false;
        // Return error from connection
        return callback(err, null);
      }
      // Set the status of the server
      self._state = 'connected';
      // Callback
      return callback(null, self);
    });
  } else {
    return callback(Error("Server parameter must be of type Server, ReplSet or Mongos"), null);
  }
}