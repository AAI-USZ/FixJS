function(server) {
			servers.push(new Server(server.host, server.port, {"auto_reconnect": true, "poolSize": 5, "readPreference": Server.READ_SECONDARY}));
		}