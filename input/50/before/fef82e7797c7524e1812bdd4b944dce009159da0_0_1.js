function(server) {
			servers.push(new Server(server.host, server.port, {"auto_reconnect": true}));
		}