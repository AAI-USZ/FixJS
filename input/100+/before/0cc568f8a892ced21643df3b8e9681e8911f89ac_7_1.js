function(testRun, result, description) {
		// make sure that the result being set is not obsolete
		var test = currentSuite.tests[currentTest];
		if(!test) {
			return;
		}
		if((testRun.suiteName != currentSuite.name) || (testRun.testName != test.name)) {
			/*
			we ignore this as it is a possible a known timing issue that can occur sometimes 
			but we have mechanisms in place to deal with this case
			*/
			Ti.API.warn("received out of date test result, ignoring");
			return;
		}

		if(result == undefined) {
			result = "success";
		}

		testResult = {
			type: "result",
			suite: currentSuite.name,
			test: currentSuite.tests[currentTest].name,
			result: result,
			description: description,
			duration: (new Date().getTime()) - testStartTime
		}

		testFinished = true;

		if(testReturned) {
			sendResult();
		}
	}