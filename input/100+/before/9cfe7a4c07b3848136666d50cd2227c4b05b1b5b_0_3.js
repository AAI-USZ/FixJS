function() {
		console.error("Initiating shutdown.");
		shuttingDown = true;
		console.error(activeRequests);
		if(activeRequests == 0) {
			console.error("Shutting down.");
			watcher.stop();
			process.exit(0);
		}
	}