function(forceClose, callback) {  
  var self = this;
  // Unpack calls
  var args = Array.prototype.slice.call(arguments, 0);
  callback = args.pop();
  // Ensure we force close all connections
  this._applicationClosed = args.length ? args.shift() : false;
  // Remove all listeners and close the connection
  this.serverConfig.close(function(err, result) {
    // Emit the close event
    if(typeof callback !== 'function') self.emit("close");

    // Emit close event across all db instances sharing the sockets
    var allServerInstances = self.serverConfig.allServerInstances();
    // Fetch the first server instance
    if(Array.isArray(allServerInstances) && allServerInstances.length > 0) {
      var server = allServerInstances[0];  
      // For all db instances signal all db instances
      if(Array.isArray(server.dbInstances) && server.dbInstances.length > 1) {
    	  for(var i = 0; i < server.dbInstances.length; i++) {
          var dbInstance = server.dbInstances[i];
          // Check if it's our current db instance and skip if it is
          if(dbInstance.databaseName !== self.databaseName && dbInstance.tag !== self.tag) {
            server.dbInstances[i].emit("close");
          }        
        }
      }
    }

    // Remove all listeners
    self.removeAllEventListeners();
    // You can reuse the db as everything is shut down
    self.openCalled = false;    
    // If we have a callback call it
    if(callback) callback(err, result);
  });
}