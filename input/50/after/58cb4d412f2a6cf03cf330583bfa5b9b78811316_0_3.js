function(err) {
		if (err) {
			console.log(err.toString());
			return;
		}
		runMochaProxy(consoleArgs);
	}