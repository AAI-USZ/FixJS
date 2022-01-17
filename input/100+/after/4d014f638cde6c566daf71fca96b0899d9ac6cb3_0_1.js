function executeCallbackWithCachedValue(callback) {

		var minutesSinceLastGet = (new Date() - this.options.lastGet) / 60000;
		var needsRefresh = minutesSinceLastGet > this.options.expiryMinutes;
		var isRefreshing = this.options.isRefreshing;
		var hasCachedValue = this.options.nonErrorCallCount > 0;

		// console.log(JSON.stringify(this.options.cachedValue));

		if (!hasCachedValue) {
			// block the caller while waiting for the data
			console.log('no value cached, executing for the first time');
			this.processAsyncMethod(callback);
		} else {
			if (needsRefresh && !isRefreshing) {
				// refresh without blocking
				console.log('cache expired, refreshing (asynchronously)');
				this.processAsyncMethod(function() {});
			}
			else if (needsRefresh && isRefreshing) {
				console.log('needs a refresh, but alreadying waiting for a refresh');
			}

			// return the last cached copy
			console.log('returning cached index view model, age = %s', minutesSinceLastGet);
			callback(null, this.options.cachedValue);
		}
	}