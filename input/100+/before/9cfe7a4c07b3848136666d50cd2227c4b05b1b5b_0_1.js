function(socket) {
	socket.destroy();
	socket = null;
	activeRequests--;

	console.error("closedconn.", activeRequests);
	if((activeRequests == 0) && shuttingDown) {
		console.error("All done!");
		process.exit(-1);
	}
}