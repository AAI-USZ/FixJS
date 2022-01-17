function() {
		var done = (loaded.length + errors.length) === paths.length;

		// if callback exists, execute it after all sounds have loaded
		if (done && typeof callback === 'function') {
			callback(sounds);
		}

		// progress is an optional intermediate callback
		if (typeof progress === 'function') {
			progress(sounds);
		}
	}