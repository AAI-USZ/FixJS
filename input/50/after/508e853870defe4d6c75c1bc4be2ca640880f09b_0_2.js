function storeNewCachedValue(value) {
		_cachedValue = value;
		opt.nonErrorCallbackCount++;
		opt.lastGet = new Date();
		opt.logInfo('updated the cached value %s times', opt.nonErrorCallbackCount);
	}