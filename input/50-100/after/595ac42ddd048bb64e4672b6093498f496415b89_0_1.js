function workerInfo(worker) {
	worker.on('listening', function(address) {
		console.log('Worker ' + worker.process.pid + ' is listening at ' + address.address + ':' + address.port);
	});

	worker.on('online', function() {
		console.log('Worker ' + worker.process.pid + ' is online');
	});
}