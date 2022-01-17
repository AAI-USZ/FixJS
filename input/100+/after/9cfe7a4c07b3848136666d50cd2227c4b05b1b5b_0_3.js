function(server) {
	var pipeServer = net.createServer();
	
	var initiateShutdown = function() {
		console.error("Initiating shutdown with " + activeRequests + " in progress");
		pipeServer.close(function() {
			console.error("Shutting down.");
			process.exit(0);
		});
	};
	
	pipeServer.listen({fd: FCGI_LISTENSOCK_FILENO}, function() {
		pipeServer.on('connection',function(socket) {
			handleConnection(socket, server);
		});
		
	});

	
	pipeServer.on('error', function(err) {
		console.error("Something bad happened: " + err);
	});
	
	process.on("SIGUSR1", initiateShutdown);
	process.on("SIGTERM", initiateShutdown);
}