function Mongos(servers, options) {
  // Set up basic
  if(!(this instanceof Mongos))
    return new Mongos(servers, options);

	// Throw error on wrong setup
	if(servers == null || !Array.isArray(servers) || servers.length == 0) throw new Error("At least one mongos proxy must be in the array");

  // Ensure we have at least an empty options object
  this.options = options == null ? {} : options;
  // Set default connection pool options
  this.socketOptions = this.options.socketOptions != null ? this.options.socketOptions : {};
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

  // Add options to servers
  for(var i = 0; i < this.servers.length; i++) {
    var server = this.servers[i];
    // Default empty socket options object
    var socketOptions = {host: server.host, port: server.port};
    // If a socket option object exists clone it
    if(this.socketOptions != null) {
      var keys = Object.keys(this.socketOptions);
      for(var k = 0; k < keys.length;k++) socketOptions[keys[i]] = this.socketOptions[keys[i]];
    }
    // Set socket options
    server.socketOptions = socketOptions;
  }
}