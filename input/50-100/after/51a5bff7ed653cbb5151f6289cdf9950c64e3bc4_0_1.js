function(done) {
		oldConsoleLog = console.log;
		oldStdout = process.stdout.write;

		console.log = function(msg) {
			lastConsoleMessage = msg;
		};

		process.stdout.write = function(msg) {
			lastStdoutMessage = msg;
		};

		done();
	}