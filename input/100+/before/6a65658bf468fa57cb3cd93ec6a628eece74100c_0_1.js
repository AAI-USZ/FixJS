function processCacheOptions(options) {

		if (_hasArgs) {
			logMessage.gotArgs(_log, opt.args);
		}

		if (opt.initialCachedValue !== null) {
			logMessage.gotInitialCachedValue(_log);
			storeNewCachedValue(opt.initialCachedValue);
		}

		// kick of the function immediately
		if (opt.updateCacheOnCreation) {
			refreshCachedValueAsync();
		}
	}