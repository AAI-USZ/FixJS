function() {
		if (browserOnlyMode === "true") {
			// in browser only mode, no action is required
			return;
		}

		var runCallback = function() {
			runHarness(commandFinishedCallback);
		};

		stopHarness();
		startServer(runCallback, commandFinishedCallback);
	}