function(data) {
		var elements = data.split("|");

		if(elements[0] == "getSuites") {
			var suitesWrapper = {type: "suites", suites: harnessGlobal.suites};
			harnessGlobal.util.sendData(suitesWrapper);

		} else if(elements[0] == "getTests") {
			setActiveSuite(elements[1]);

			var testsWrapper = {type: "tests", tests: currentSuite.tests};
			harnessGlobal.util.sendData(testsWrapper);

		} else if(elements[0] == "run") {
			if(currentSuite.name != elements[1]) {
				setActiveSuite(elements[1]);
			}

			for(var i in currentSuite.tests) {
				if(currentSuite.tests[i].name == elements[2]) {
					currentTest = i;
					testStartTime = new Date().getTime();
					testReturned = false;
					testFinished = false;
					resultSent = false;

					Ti.API.info("running suite<" + elements[1] + "> test<" + elements[2] + ">...");
					try {
						/*
						keep a unique scope for the test that can be shared among the utility 
						functions and passed back with the result as a state check to guard against 
						processing obsolete results
						*/
						currentSuite[currentSuite.tests[currentTest].name]({
							suiteName: currentSuite.name,
							testName: currentSuite.tests[currentTest].name,
							resultSet: false
						});

						testReturned = true;

						if(testFinished) {
							sendResult();
						}

					} catch(e) {
						var exceptionDetails;

						if(e.stack) {
							exceptionDetails = e.stack;

						} else if(e.lineNumber) {
							exceptionDetails = e.lineNumber;

						} else if(e.line) {
							/*
							this is all we can get on iOS which isn't that useful compared to
							an actual trace.  If the error is a test definition issue rather than 
							platform specific bug you should run the test against android for a 
							better trace
							*/
							exceptionDetails = e.line;

						} else {
							exceptionDetails = "unable to get exception details";
						}

						setResult(testRun, "exception", "<" + exceptionDetails + ">");
						sendResult();
					}
				}
			}
		}
	}