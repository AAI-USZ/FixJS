function(result) {
  var self = this;
  // For each member we need to check if we have a new connection that needs to be established
  var members = result['documents'][0]['members'];
  // Get members
  var members = Array.isArray(result['documents'][0]['members']) ? result['documents'][0]['members'] : [];
  // The total members we check
  var serversToConnectList = {};

  // Iterate over all the members and see if we need to reconnect
  for(var i = 0, jlen = members.length; i < jlen; i++) {
    var member = members[i];

    if(member['health'] != 0
      && null == self._state['addresses'][member['name']]
      && null == serversToConnectList[member['name']]) {
      // Split the server string
      var parts = member.name.split(/:/);
      if(parts.length == 1) {
        parts = [parts[0], Connection.DEFAULT_PORT];
      }

      // Default empty socket options object
      var socketOptions = {host:parts[0], port:parseInt(parts[1])};
      // If a socket option object exists clone it
      if(self.socketOptions != null) {
        var keys = Object.keys(self.socketOptions);
        for(var k = 0; k < keys.length;k++) socketOptions[keys[i]] = self.socketOptions[keys[i]];
      }

      // Create a new server instance
      var newServer = new Server(parts[0], parseInt(parts[1]), {auto_reconnect:false, 'socketOptions':socketOptions
                      , logger:self.logger, ssl:self.ssl, poolSize:self.poolSize});
      // Set the replicaset instance
      newServer.replicasetInstance = self;

      // Add handlers
      newServer.on("close", self.closeHandler);
      newServer.on("timeout", self.timeoutHandler);
      newServer.on("error", self.errorHandler);
      // Add to list of server connection target
      serversToConnectList[member['name']] = newServer;
    } else if(member['stateStr'] == 'PRIMARY' && self._state.master['name'] != member['name']) {
      // Delete master record so we can rediscover it
      delete self._state['addresses'][self._state.master['name']];
      // Update inormation on new primary
      var newMaster = self._state.secondaries[member['name']];
      newMaster.isMasterDoc.ismaster = true;
      newMaster.isMasterDoc.secondary = false;
      self._state.master = newMaster;
      // Remove from secondaries
      delete self._state.secondaries[member['name']];
      newMaster = null;
    }
  }

  // All servers we want to connect to
  var serverKeys = Object.keys(serversToConnectList);
  // For all remaining servers on the list connect
  while(serverKeys.length > 0) {
    var _serverKey = serverKeys.pop();
    // Fetch the server
    var _server = serversToConnectList[_serverKey];
    // Add a new server to the total number of servers that need to initialized before we are done
    var newServerCallback = self.connectionHandler(_server);
    // Connect
    _server.connect(self.db, {returnIsMasterResults: true, eventReceiver:newServer}, function(err, result) {
      process.nextTick(function() {
        // Call the setup
        newServerCallback(err, result);
      });

      // If we have 0 new servers let's go back to rechecking
      if(serverKeys.length <= 0) {
        self.haProcessInProgress = false;
      }
    });
  }
}