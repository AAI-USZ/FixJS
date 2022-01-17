function error(message) {
		if ($views.debugMode) {
			throw new $views.Error(message);
	}
	}