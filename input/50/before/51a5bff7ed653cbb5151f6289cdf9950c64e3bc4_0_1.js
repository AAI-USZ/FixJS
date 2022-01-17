function(done) {
		console.log = oldConsoleLog;
		process.stdout.write = oldStdOut;
		done();
	}