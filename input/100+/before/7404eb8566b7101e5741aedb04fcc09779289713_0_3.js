function CacheBlockFirstThenAsync(fn, cacheOptions) {

	validateArguments(fn, cacheOptions);

	// Use 'private' variables for our core logic
	var opt = _.extend({}, globalPublicOptions, defaultCacheOptions, cacheOptions);
	var _fnName = fn.name;

	// if opt.cacheName is *not* set by now, make sure we set it
	opt.cacheName = opt.cacheName || _fnName || 'unnamed cache';

	var _log = opt.getLogger(); // must happen after cacheName is configured
	var _hasArgs = cacheOptions ? ('undefined' !== typeof cacheOptions.args) : false;
	var _lastGet = new Date(2000, 1, 1); // the date/time of the last callback (which wasnt an error)
	var _numTimesGotNewCachedValue = 0; // the number of times the wrapped method made a callback without an error
	var _isRefreshing = false;
	var _cachedValue = opt.initialCachedValue;
	var _ee = new EventEmitter();

	// initial configuration
	processCacheOptions(opt);

	function validateArguments(fn, cacheOptions) {
		// validation arguments / options
		if (!fn) throw NewError(errorsArgFnIsMandatory);
		if (!_.isFunction(fn)) throw NewError(ArFnMustBeFunction);

		var hasArgsInCacheOptions = cacheOptions ? ('undefined' !== typeof cacheOptions.args) : false;

		// TODO: is there a better way to get parameters programatically?
		function getParamNames(func) {
			var funStr = func.toString();
			return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
		}

		var fnParamNames = getParamNames(fn);
		if (fnParamNames.length < 1 || fnParamNames.length > 2) {
			throw NewError(ArgFnInvalidParameterCount);
		}

		// make sure the cached method argument count and the cacheOptions.args match
		if (hasArgsInCacheOptions && fnParamNames.length !== 2) {
			throw NewError(msg.ArgsSpecifiedWhenFnDoesntAcceptIt);
		}
		else if (!hasArgsInCacheOptions && fnParamNames.length !== 1) {
			throw NewError(ArgsMustSpecifiedWhenFnRequiresMultipleParams);
		}
	}

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

	function storeNewCachedValue(value) {
		_cachedValue = value;
		_lastGet = new Date();
		_numTimesGotNewCachedValue++;
		logMessage.updatedCachedValueNtimes(_log, _numTimesGotNewCachedValue);
	}

	function onFnCallback(error, value) {
		_isRefreshing = false;

		if (!error) {
			storeNewCachedValue(value);
		} else {
			logMessage.refreshFailedWithFnCallbackError(_log, error);
		}

		_ee.emit(events.cachedValueRefreshed, error, value);
	}

	function refreshCachedValueAsync() {

		logMessage.refreshingTheCachedValue(_log);
		_isRefreshing = true;
		_ee.emit(events.cachedValueRefreshing);

		// call the cahed method with the correct arguments
		var args = _hasArgs ? [opt.args, onFnCallback] : [onFnCallback];
		fn.apply(this, args);
	}

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

	CacheBlockFirstThenAsync.prototype = {
		onFnCallback: onFnCallback,
		getCachedValue: getCachedValue,
		refreshCachedValueAsync: refreshCachedValueAsync,
		storeNewCachedValue: storeNewCachedValue,
		processCacheOptions: processCacheOptions,
		validateArguments: validateArguments
	};

	return {
		get: getCachedValue,
		update: refreshCachedValueAsync,
		getOptions: function() { return opt; }
	};
}