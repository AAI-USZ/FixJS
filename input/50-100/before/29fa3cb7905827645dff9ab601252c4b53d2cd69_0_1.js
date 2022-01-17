function processAsyncMethodCallback(value, error) {
		if (!error) {
			this.options.nonErrorCallCount++;
			this.options.lastGet = new Date();
			this.options.isRefreshing = false;
			this.options.cachedValue = value;
		} else {
			console.log('error %s', error);
		}
	}