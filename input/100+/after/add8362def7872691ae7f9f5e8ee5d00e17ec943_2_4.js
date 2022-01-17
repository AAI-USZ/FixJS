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
  if(self._state == 'connecting' && this.serverConfig.autoReconnect) {
    process.nextTick(function() {
      self.commands.push({type:'insert', 'db_command':db_command, 'options':options, 'callback':callback});
    })
  } else if(!this.serverConfig.isConnected() && this.serverConfig.autoReconnect) {
    this._state = 'connecting';
    // Retry command
    __retryCommandOnFailure(this, this.retryMiliSeconds, this.numberOfRetries, __executeInsertCommand, db_command, options, callback);
  } else if(!this.serverConfig.isConnected() && !this.serverConfig.autoReconnect && callback) {
    // Fire an error to the callback if we are not connected and don't do reconnect
    if(callback) callback(new Error("no open connections"), null);
  } else {
    // If we have a
    if(this.serverConfig instanceof ReplSet && this.serverConfig.checkReplicaSet()) {
      // Execute insert command
      __executeInsertCommand(self, db_command, options, callback)

      var replSetGetStatusCommand = DbCommand.createAdminDbCommandSlaveOk(self, {replSetGetStatus:1}, {});
      // Do a freaking ping
      __executeQueryCommand(self, replSetGetStatusCommand, {readPreference:ReadPreference.SECONDARY_PREFERRED}, function(_replerr, _replresult) {
        // Force close if we are disconnected
        if(self._state == 'disconnected') {
          self.close(true);
          return;
        }

        // Handle the HA
        if(_replerr == null) {
          self.serverConfig.validateReplicaset(_replresult, self.auths);
        }
      })
    } else {
      __executeInsertCommand(self, db_command, options, callback)
    }
  }
}