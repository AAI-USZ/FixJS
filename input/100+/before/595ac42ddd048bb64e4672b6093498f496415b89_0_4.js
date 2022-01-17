function(callback) {
	if(cluster.isWorker) {
		process.on('SIGUSR2', function() {
			console.log("Process is under killed: " + process.pid);
			/* doing cleanup before exit */
			console.log('Graceful');
			process.exit(0);
		});

		process.on('SIGTERM', function() {
			console.log("Process is under killed: " + process.pid);
			/* doing cleanup before exit */
			console.log('Stop/kill');

			process.exit(0);
		});
		if(callback)
			callback();
	}
	return pstarter;
}