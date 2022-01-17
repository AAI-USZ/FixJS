function() {
			console.log("Graceful signal");

			var ids = [], timeout = 0;
			ids = Object.keys(cluster.workers);
			worker = forkWorkers(1).shift();
			console.log("Create extra worker for better graceful: " + worker.process.pid);
			worker.on('listening', function(address) {
				console.log('Extra worker ' + worker.process.pid + ' is listening at ' + address.address + ':' + address.port);
				ids.forEach(function(id) {
					gracefulWorker(cluster.workers[id], timeout);
					timeout += gracefulStep;
				});
			});
		}