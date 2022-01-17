function(done) {
		console.log = oldConsoleLog;
		process.stdout.write = oldStdout;
		done();
	}