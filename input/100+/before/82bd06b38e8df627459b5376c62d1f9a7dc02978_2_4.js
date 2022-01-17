function(callback) {
  var self = this;
  // Set server status as disconnected
  this._serverState = 'disconnected';
  // Get all the server instances and close them
  var allServers = [];
  // Make sure we have servers
  if(this._state['addresses'] != null) {
    var keys = Object.keys(this._state.addresses);
    for(var i = 0; i < keys.length; i++) {
      allServers.push(this._state.addresses[keys[i]]);
    }
  }

  // Let's process all the closing
  var numberOfServersToClose = allServers.length;

  // Remove all the listeners
  self.removeAllListeners();

  // Special case where there are no servers
  if(allServers.length == 0 && typeof callback === 'function') return callback(null, null);

  // Close the servers
  for(var i = 0; i < allServers.length; i++) {
    var server = allServers[i];
    if(server.isConnected()) {
      // Close each server
      server.close(function() {
        numberOfServersToClose = numberOfServersToClose - 1;
        // Clear out state if we are done
        if(numberOfServersToClose == 0) {
          // Clear out state
          self._state = {'master':null, 'secondaries':{}, 'arbiters':{}, 'passives':{}, 'errors':{}, 'addresses':{}, 'byTags':{}, 'setName':null, 'errorMessages':[], 'members':[]};
        }

        // If we are finished perform the call back
        if(numberOfServersToClose == 0 && typeof callback === 'function') {
          callback(null);
        }
      })
    } else {
      numberOfServersToClose = numberOfServersToClose - 1;
      // If we have no more servers perform the callback
      if(numberOfServersToClose == 0 && typeof callback === 'function') {
        callback(null);
      }
    }
  }
}