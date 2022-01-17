function(server, err) {
  // Locate all the possible callbacks that need to return
  for(var i = 0; i < server.dbInstances.length; i++) {
    // Fetch the db Instance
    var dbInstance = server.dbInstances[i];
    // Check all callbacks
    var keys = Object.keys(dbInstance._callBackStore._notReplied);
    // For each key check if it's a callback that needs to be returned
    for(var j = 0; j < keys.length; j++) {
      var info = dbInstance._callBackStore._notReplied[keys[j]];
      if(info.connection.socketOptions.host === server.host && info.connection.socketOptions.port === server.port) {
        dbInstance._callBackStore.emit(keys[j], err, null);
      }
    }
  }  
}