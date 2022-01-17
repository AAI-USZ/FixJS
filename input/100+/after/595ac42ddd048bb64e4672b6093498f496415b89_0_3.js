function(confFile, masterSettings, callback) {
	if(cluster.isMaster) {
		conf = confFile;
		if( typeof confFile == 'string') {
			config = require(confFile);
		} else {
			config = confFile;
		}
		PID_FILE = process.env['PID_FILE'];
		if(config.PID_FILE) {
			PID_FILE = config.PID_FILE;
		}

		if(masterSettings) {
			cluster.setupMaster(masterSettings);
		}

		cluster.on('exit', function(worker, code, signal) {
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
		});
		forkWorkers(config.http.numWorkers);

		/* graceful */
		process.on('SIGUSR2', function() {
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
		});
		/* restart: reload http/master conf before starting workers */
		process.on('SIGHUP', function() {
			console.log("Restart signal");
			var pids = [];

			if( typeof conf == 'string') {
				try {
					delete require.cache[require.resolve(conf)];
					config = require(conf);
				} catch(e) {

				}
			}

			Object.keys(cluster.workers).forEach(function(id) {
				cluster.workers[id].disconnect();
				pids.push(cluster.workers[id].process.pid);
			});

			pids.forEach(function(pid) {
				killWorker(pid, 0, 'SIGTERM');
			});
			
			/* Don't work well on Ubuntu/Node v0.8.1
			 cluster.disconnect(function() {
			 console.log('Fork new worker set');
			 forkWorkers(config.http.numWorkers);
			 });
			 */
		});
		/* stop */
		process.on('SIGTERM', function() {
			shuttingDown = true;
			var pids = [];
			Object.keys(cluster.workers).forEach(function(id) {
				cluster.workers[id].disconnect();
				pids.push(cluster.workers[id].process.pid);
			});

			pids.forEach(function(pid) {
				killWorker(pid, 0, 'SIGTERM');
			});
			var fd = fs.openSync(PID_FILE, 'w+');
			fs.writeSync(fd, "");
			fs.close(fd);
			process.exit(0);

			/* Don't work well on Ubuntu/Node v0.8.1
			 cluster.disconnect(function() {
			 console.log('Finishing disconnect');
			 var fd = fs.openSync(PID_FILE, 'w+');
			 fs.writeSync(fd, "");
			 fs.close(fd);
			 process.exit(0);
			 });
			 */
		});
		var fd = fs.openSync(PID_FILE, 'w+');
		fs.writeSync(fd, process.pid);
		fs.close(fd);
		
		if (callback) {
			callback();
		}
	}

	return pstarter;
}