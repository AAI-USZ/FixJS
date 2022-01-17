function processCacheOptions(options) {
		if ('undefined' !== typeof opt.args) {
			opt.logInfo('got args %s', dumpObjectToString(opt.args));
		}

		if (opt.initialCachedValue !== null) {
			opt.logInfo('got initialCachedValue');
			storeNewCachedValue(opt.initialCachedValue);
		}

		// kick of a cache update immediately
		if (opt.updateCacheOnCreation) {
			refreshCachedValueAsync();
		}
	}