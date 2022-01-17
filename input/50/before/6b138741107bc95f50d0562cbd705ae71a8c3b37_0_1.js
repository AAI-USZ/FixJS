function(e) {
		if (!timedOut) {
            deferred.reject(e);
        }
	}