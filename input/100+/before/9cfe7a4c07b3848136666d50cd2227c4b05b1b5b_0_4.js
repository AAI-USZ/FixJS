function(server) {
	var initiateShutdown = function() {
		console.error("Initiating shutdown.");
		shuttingDown = true;
		console.error(activeRequests);
		if(activeRequests == 0) {
			console.error("Shutting down.");
			watcher.stop();
			process.exit(0);
		}
	};

	var watcher = new IOWatcher();
	watcher.set(FCGI_LISTENSOCK_FILENO, true, false);
	
	watcher.callback = function() {
		var result = _net_accept(FCGI_LISTENSOCK_FILENO);
		handleConnection(result, server);
	};
	
	watcher.start();

	process.on("SIGUSR1", initiateShutdown);
	process.on("SIGTERM", initiateShutdown);
}