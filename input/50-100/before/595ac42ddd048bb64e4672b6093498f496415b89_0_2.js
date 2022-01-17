function(worker, code, signal) {
			console.log('worker ' + worker.process.pid + ' died');
			if(shuttingDown === true) {
				console.log('master is shutting down workers');
				return;
				/* master is shutting down workers. */
			}
			if(Object.keys(cluster.workers).length >= config.http.numWorkers) {
				return;
			}
			worker = forkWorkers(1).shift();
			console.log("Replace with worker: " + worker.process.pid);
			lastWorkerCreated = Date.now();
		}