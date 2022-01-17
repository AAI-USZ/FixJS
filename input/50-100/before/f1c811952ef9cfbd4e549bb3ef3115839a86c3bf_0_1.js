function() {
		var done = (loaded.length + errors.length) === paths.length;

		// if callback exists, execute it after all sounds have loaded
		if (done && callback) {
			callback(sounds);
		}

		// progress is an optional intermediate callback
		if (progress) {
			progress(sounds);
		}
	}