function CachedAsyncMethodClosure() {

	var defaultOptions = {
		lastGet: new Date(2000, 1, 1), // the time when we last got a value from the async method
		isRefreshing: false, // true when the cached method is being executed
		nonErrorCallCount: 0, // the num times the method was called (without returning an error)
		cachedValue: undefined,
		expiryMinutes: 5,
	}

	function Constructor(options) {
		// check options are valid
		if (!options) throw new Error('options must be provided');
		if (!options.method && typeof options.method === 'function') throw new Error('options.method must be the function');
		if (!options.args) throw new Error('options.args must be specified');

		this.options = _.extend({}, defaultOptions, options);
		this.execute = execute;
	}

	// the callback of the _asyncMethod
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

	function processAsyncMethod(callback) {
		
		this.options.isRefreshing = true;
		var self = this;

		this.options.method(this.options.args, function(value, error) {
			self.processAsyncMethodCallback(value, error);

			if (!error) {
				callback(self.options.cachedValue);
			}
			else {
				callback(null, error);
			}
		});
	}

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
				console.log('cache expired, refreshing (asynchronously)')
				this.processAsyncMethod(function() {});
			}
			else if (needsRefresh && isRefreshing) {
				console.log('needs a refresh, but alreadying waiting for a refresh');
			}

			// return the last cached copy
			console.log('returning cached index view model, age = %s', minutesSinceLastGet);
			callback(this.options.cachedValue);
		}
	}

	function execute(options, callback) {

		if (arguments.length !== 2) throw Error('execute method must have two arguments passed in, the options and the callback');
		if (typeof callback !== 'function') throw Error('the callback must be a function');

		this.executeCallbackWithCachedValue(callback);
	}

	Constructor.prototype = {
		execute: execute
		, executeCallbackWithCachedValue: executeCallbackWithCachedValue
		, processAsyncMethod: processAsyncMethod
		, processAsyncMethodCallback: processAsyncMethodCallback
		, 
	};

	return Constructor;
}