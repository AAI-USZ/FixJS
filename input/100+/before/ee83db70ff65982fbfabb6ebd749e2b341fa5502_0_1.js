function() {
  // Neeed to build a complete list of all raw connections, start with master server
  var allConnections = [];
  // Get connection object
  var allMasterConnections = this._state.master.connectionPool.getAllConnections();
  // Add all connections to list
  allConnections = allConnections.concat(allMasterConnections);

  // If we have read secondary let's add all secondary servers
  if(this.readSecondary && Object.keys(this._state.secondaries).length > 0) {
    // Get all the keys
    var keys = Object.keys(this._state.secondaries);
    // For each of the secondaries grab the connections
    for(var i = 0; i < keys.length; i++) {
      // Get connection object
      var secondaryPoolConnections = this._state.secondaries[keys[i]].connectionPool.getAllConnections();
      // Add all connections to list
      allConnections = allConnections.concat(secondaryPoolConnections);
    }
  }

  // Return all the conections
  return allConnections;
}