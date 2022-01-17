function Mongos(servers, options) {
  // Set up basic
  if(!(this instanceof Mongos))
    return new Mongos(servers, options);

	// Throw error on wrong setup
	if(servers == null || !Array.isArray(servers) || servers.length == 0) throw new Error("At least one mongos proxy must be in the array");

  // Ensure we have at least an empty options object
  this.options = options == null ? {} : options;
  // Enabled ha
  this.haEnabled = this.options['ha'] == null ? true : this.options['ha'];
  // How often are we checking for new servers in the replicaset
  this.mongosStatusCheckInterval = this.options['haInterval'] == null ? 2000 : this.options['haInterval'];
	// Save all the server connections
	this.servers = servers;
	// Servers we need to attempt reconnect with
	this.downServers = [];
  // Just contains the current lowest ping time and server
  this.lowestPingTimeServer = null;
  this.lowestPingTime = 0;
}