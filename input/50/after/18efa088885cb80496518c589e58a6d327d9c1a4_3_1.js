function (suite, test) {
			var msgString = 'Testsuite ' + param_suiteName + '#' + suite + ' timed out in testcase ' + test;
			process.send({
				type:'timeout', 
				msg: msgString
			});
			//suitesFinished++; this should be handled by the 'finish' event callback, which the testsuite sends after a timeout
		}