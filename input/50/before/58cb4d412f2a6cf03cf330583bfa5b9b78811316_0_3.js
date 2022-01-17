function(err) {
		if (err) {
			console.log(err.toString());
			return;
		}
		runJasmineProxy(consoleArgs);
	}