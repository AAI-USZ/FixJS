function(server, filterDb, event, message, object) {
  // Emit close event across all db instances sharing the sockets
  var allServerInstances = server.allServerInstances();
  // Fetch the first server instance
  var serverInstance = allServerInstances[0];
  // For all db instances signal all db instances
  if(Array.isArray(serverInstance.dbInstances) && serverInstance.dbInstances.length > 1) {
	  for(var i = 0; i < serverInstance.dbInstances.length; i++) {
      var dbInstance = serverInstance.dbInstances[i];
      // Check if it's our current db instance and skip if it is
      if(filterDb == null || filterDb.databaseName !== dbInstance.databaseName || filterDb.tag !== dbInstance.tag) {
  	    dbInstance.emit(event, message, object);
      }
    }
  }
}