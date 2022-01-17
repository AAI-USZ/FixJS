function (param_suiteName, param_timesToRunSuite, param_testFunctions, param_preTestFunction, param_suiteTimeout, param_globalVar) {
	var workerCount = 0;
	var that = this;

	if (numCPUs>param_timesToRunSuite) {
		//there are more cores than tests to run
		workerCount = param_timesToRunSuite;
	} else {
		workerCount = numCPUs;
	};

	if (cluster.isMaster) {
		// Fork workers.
		for (var i = 0; i < workerCount; i++) {
			var worker = cluster.fork({uuid:this.uuid, workerCount:workerCount, workerId:i, logTarget:this.logTarget});
			worker.on('message', function (event) {
				that.emit(event.type, event.msg)
			});
		};
		
		cluster.on('exit', function (worker, code, signal) {
			if (!--workerCount) {
				that._tearDown();
			}
		});
	} else {
		//calculate 
		this._spawnWorker(param_suiteName, param_timesToRunSuite, param_testFunctions, param_preTestFunction, param_suiteTimeout, param_globalVar);
	};
}