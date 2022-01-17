function (param_suiteName, param_timesToRunSuite, param_testFunctions, param_preTestFunction, param_suiteTimeout, param_globalVar) {
	//result array
	var results = [];

	//create logger
	this.logger = new Logger({logTarget:process.env.logTarget});

	//run on the cluster
	var Testsuite = require('./lib/Testsuite.js');
	
	//keep track of finished suites
	var suitesFinished = 0;
	var suitesCreated = 0;

	//times to run suite per core
	var timesToRunSuitePerCore = Math.floor(param_timesToRunSuite/process.env.workerCount);

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