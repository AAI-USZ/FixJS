function(error) {
		if (error) {
			console.log("unable to open database")
			console.log(util.inspect(error, true, 7, true));
			return callback && callback();
		}
		else {
			console.log("connected to the database")
		}
				
		self._started = Date.now();
		
		self._heartbeat(true);
		
		self._server = net.createServer({"allowHalfOpen": true}, function(socket) {
			var data = "";
						
			socket.setEncoding("utf8");
			socket.setKeepAlive(true);
	
			// A client is connecting
			socket.on("connect", function() {
				console.log("[" + socket.remoteAddress + "] connected; waiting for identification.");
			});
	
			// Receive data from the client
			socket.on("data", function(chunk) {
				try {
					data += chunk;
					payloads = data.split("\n\n");
					data = "";
					
					if (payloads.length) {
						socket.pause();
						
						payloads.forEach(function(payload) {
							if (payload.slice(-1) === "}") {
								payload = JSON.parse(payload);
								
								if (payload.command === "identifyClient" && payload.params && payload.params.identity) {
									self._sockets[payload.params.identity] = socket;
									socket.identity = payload.params.identity;
								}
								
								if (!util.isArray(payload.params)) {
									payload.params.o = socket.identity;
								}

								console.log("[" + socket.remoteAddress + "]" + ((socket.identity && " [" + socket.identity + "] ") || " ") + payload.command + " " + JSON.stringify(payload.params));
								
								if (payload.command !== "identifyClient") {
									self.command_queue.push({
										"command": payload.command,
										"owner": socket.identity,
										"params": payload.params,
									});
									self.command_idle && self.emit("processCommand");
								}
							}
							else if (payload.length) {
								data = payload;
								socket.resume();
							}
							else {
								socket.resume();
							}
						});
					}
				}
				catch (ex) {
					// incomplete?
					socket.write(JSON.stringify({"error": "failed to parse JSON (send not finished?)"}));
				}
			});
		
			// Client finished writing
			socket.on("drain", function() {
			});
			
			socket.on("close", function(had_error) {
				console.log("[" + socket.identity + "] disconnected; closed" + (had_error ? " with error" : ""));
			});
	
			// Client finished
			socket.on("end", function() {
				console.log("[" + socket.identity + "] disconnected");		
				socket.removeAllListeners();
				if (socket.identity) {
					delete self._sockets[socket.identity];
				}
				socket.end();
			});
		}).listen(1997);
	
		self._server.on("error", function(error) {
			if (error) {
				console.log(error.message);
				console.log(error.stack);				
				console.log(util.inspect(error, true, 7, true));
				return;
			}			
		});
		
		
		// Process commands in order as they roll in
		self.on("processCommand", function() {
			if (self.command_queue.length) {
				self.command_idle = false;
				
				var command = self.command_queue.shift();
				
				console.log("command " + command.command + " issued (" + self.command_queue.length + ")");
				self[command.command](command.owner, command.params, function() {
					console.log("command " + command.command + " finished (" + self.command_queue.length + ")");
					self.emit("processCommand");
				});
			}
			else {
				self.command_idle = true;
			}
		}	
		callback && callback();
	});
