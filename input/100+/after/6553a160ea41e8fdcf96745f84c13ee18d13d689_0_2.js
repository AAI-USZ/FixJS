function(db_command, options, callback) {
  var self = this;

  // Unpack the parameters
  if (typeof callback === 'undefined') {
    callback = options;
    options = {};
  }

  // Check if the user force closed the command
  if(this._applicationClosed) {
    if(typeof callback == 'function') {
      return callback(new Error("db closed by application"), null);
    } else {
      throw new Error("db closed by application");
    }
  }
  
  // If the pool is not connected, attemp to reconnect to send the message
  if(this._state == 'connecting' && this.serverConfig.autoReconnect) {
    process.nextTick(function() {
      self.commands.push({type:'query', 'db_command':db_command, 'options':options, 'callback':callback});      
    })
  } else if(!this.serverConfig.isConnected() && this.serverConfig.autoReconnect) {    
    this._state = 'connecting';
    // Retry command
    __retryCommandOnFailure(this, this.retryMiliSeconds, this.numberOfRetries, __executeQueryCommand, db_command, options, callback);
  } else if(!this.serverConfig.isConnected() && !this.serverConfig.autoReconnect && callback) {    
    // Fire an error to the callback if we are not connected and don't do reconnect
    callback(new Error("no open connections"), null);            
  } else {
    __executeQueryCommand(self, db_command, options, callback)
  }
}