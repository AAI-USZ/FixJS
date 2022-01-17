function (param_suiteName, param_timesToRunSuite, param_testFunctions, param_preTestFunction, param_suiteTimeout, param_globalVar) {
	var workerCount = 0;

	if (numCPUs>param_timesToRunSuite) {
		//there are more cores than tests to run
		workerCount = param_timesToRunSuite;
	} else {
		workerCount = numCPUs;
	}

	if (cluster.isMaster) {
		// Fork workers.
		for (var i = 0; i < workerCount; i++) {
			cluster.fork({uuid:this.uuid, workerCount:workerCount, logTarget:this.logTarget});
		}
		cluster.on('exit', function(worker, code, signal) {
			console.log('worker ' + worker.pid + ' died');
		});
	} else {
		this._spawnWorker(param_suiteName, param_timesToRunSuite, param_testFunctions, param_preTestFunction, param_suiteTimeout, param_globalVar);
	}

}