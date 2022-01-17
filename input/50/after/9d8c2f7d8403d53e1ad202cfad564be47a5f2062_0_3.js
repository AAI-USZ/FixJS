function error(message) {
		if (jsv.debugMode) {
			throw new jsv.Error(message);
		}
	}