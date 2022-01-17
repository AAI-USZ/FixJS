function processAsyncMethodCallback(error, value) {
		if (!error) {
			this.options.nonErrorCallCount++;
			this.options.lastGet = new Date();
			this.options.isRefreshing = false;
			this.options.cachedValue = value;
		} else {
			console.log('processAsyncMethodCallback: error %s', JSON.stringify(error));
		}
	}