function storeNewCachedValue(value) {
		opt.logInfo('updating the cached value');

		_cachedValue = value;
		opt.nonErrorCallbackCount++;
		opt.lastGet = new Date();
	}