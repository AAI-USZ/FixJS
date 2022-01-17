function(callback) {
	if (this._context.mongodb && this._context.mongodb.using_replica_sets) {
		var servers = [];
		
		this._context.mongodb.servers.forEach(function(server) {
			servers.push(new Server(server.host, server.port, {"auto_reconnect": true, "poolSize": 5, "readPreference": Server.READ_SECONDARY}));
		});
		
		// Connect to our databases and open
		this._store = new Db(this._context.mongodb.datastore, new ReplSet(servers, {"readPreference": Server.READ_SECONDARY, "rs_name": this._context.mongodb.replica_set_name, "socketOptions": {"keepAlive": 1, "timeout": 1000}}));
	}
	else {
		// Connect to our database
		this._store = new Db(this._context.mongodb.datastore, new Server(this._context.mongodb.servers[0].host, this._context.mongodb.servers[0].port, {"auto_reconnect": true}));
	}

	this._store.open(callback);	
}