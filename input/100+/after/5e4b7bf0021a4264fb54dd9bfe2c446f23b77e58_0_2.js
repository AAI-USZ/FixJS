function (param_suiteName, param_timesToRunSuite, param_testFunctions, param_preTestFunction, param_suiteTimeout, param_globalVar) {
	//result array
	var results = [];

	//create logger
	this.logger = new Logger({logTarget:process.env.logTarget});

	//run on the cluster
	var Testsuite = require('./lib/Testsuite.js');
	

	//parse Parameter
	var workerId = parseInt(process.env.workerId);
	var timesToRunSuite = parseInt(param_timesToRunSuite);
	var workerCount = parseInt(process.env.workerCount);

	//calculate start# for this worker, check github issue#2
	var start = (workerId * timesToRunSuite)/workerCount;
	start = Math.round(start);
	var stop = (((workerId+1) * timesToRunSuite)/workerCount) - 1;
	stop = Math.round(stop);
	//DEBUG Print: console.log('id: ' + process.env.workerId + ', start: ' + Math.round(start) + ', stop: ' + Math.round(stop));

	//keep track of finished suites
	var suitesFinished = start;
	var suitesCreated = start;

	//times to run suite per core
	var timesToRunSuitePerCore = stop-start+1;

	//create suites
	var suites = [];
	while (timesToRunSuitePerCore--) {
		suites.push(new Testsuite(process.env.uuid, suitesCreated++, param_suiteName, param_suiteTimeout, param_testFunctions, param_preTestFunction, param_globalVar));
	}

	var that = this;
	//add listeners
	suites.forEach (function (testsuite) {
		testsuite.on('finished', function (result) {
			results.push(result);
			suitesFinished++;
			if(suitesFinished === suitesCreated) {
				//we are done with this Worker, send 
				that.logger.log(results);
				that._closeDb();
			}
		});

		testsuite.on('timeout', function (suite, test) {
			console.log('suite ' + param_suiteName + '#' + suite + ' timed out in test ' + test);
			suitesFinished++;
		});
	});
	
	//run suites
	suites.forEach(function(testsuite){
		testsuite.run();
	});
}