function getCachedValue(callback) {

		if (arguments.length != 1) throw errors.MustHaveOnlyCallback();
		if (!_.isFunction(callback)) throw errors.CallbackMustBeFunction();

		var minutesSinceLastGet = (new Date() - _lastGet) / 60000;
		var needsRefresh = minutesSinceLastGet >= opt.expiryMinutes;
		var isRefreshing = _isRefreshing;
		var hasCachedValue = _numTimesGotNewCachedValue > 0 && _cachedValue;

		if (!hasCachedValue) {
			if (!isRefreshing) {
				logMessage.noCachedValueAndNotAlreadyRefreshing(_log);

			}
			else {
				logMessage.noCachedValueAndAlreadyRefreshing(_log);
			}

			// Once the cached value is updated, the supplied callback will be executed
			// block the caller while waiting for the data
			_ee.once(events.cachedValueRefreshed, callback);
			refreshCachedValueAsync();
		}
		else {
			if (needsRefresh && isRefreshing) {
				logMessage.needCacheRefreshButAlreadyRequested(_log);
			}
			else if (needsRefresh && !isRefreshing) {
				// refresh without blocking
				logMessage.cacheExpiredAndTriggeringRefresh(_log);
				refreshCachedValueAsync();
			}

			// return the last cached copy
			logMessage.returningCachedValueAgeInMinutes(_log, minutesSinceLastGet);
			callback(null, _cachedValue);
		}
	}