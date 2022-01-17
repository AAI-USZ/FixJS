function() {
			console.log("Graceful signal");

			var workerPid, pids = {}, timeout = 0;
			for(workerPid in cluster.workers) {
				pids[workerPid] = workerPid;
			}
			worker = forkWorkers(1).shift();
			console.log("Create extra worker for better graceful: " + worker.process.pid);
			lastWorkerCreated = Date.now();
			worker.on('listening', function(address) {
				console.log('Extra worker ' + worker.process.pid + ' is listening at ' + address.address + ':' + address.port);
				for(workerPid in pids) {
					gracefulWorker(cluster.workers[workerPid], timeout);
					timeout += gracefulStep;
				}
			});
		}