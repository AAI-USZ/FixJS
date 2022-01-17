function(callback) {
	if (this._context.mongodb && this._context.mongodb.using_replica_sets) {
		var servers = [];
		
		this._context.mongodb.servers.forEach(function(server) {
			servers.push(new Server(server.host, server.port, {"auto_reconnect": true}));
		});
		
		// Connect to our databases and open
		this._store = new Db(this._context.mongodb.datastore, new ReplSetServers(servers, {"rs_name": this._context.mongodb.replica_set_name}));
	}
	else {
		// Connect to our database
		this._store = new Db(this._context.mongodb.datastore, new Server(this._context.mongodb.servers[0].host, this._context.mongodb.servers[0].port, {"auto_reconnect": true}));
	}

	this._store.open(callback);	
}