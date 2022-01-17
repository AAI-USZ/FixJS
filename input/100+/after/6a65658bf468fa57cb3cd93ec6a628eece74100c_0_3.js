function validateArguments(fn, cacheOptions) {
		// validation arguments / options
		if (!fn) { throw new Error(error.ArgFnIsMandatory); }
		if (!_.isFunction(fn)) { throw new Error(error.ArgFnMustBeFunction);}

		var hasArgsInCacheOptions = cacheOptions ? ('undefined' !== typeof cacheOptions.args) : false;

		// TODO: is there a better way to get parameters programatically?
		function getParamNames(func) {
			var funStr = func.toString();
			return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
		}

		var fnParamNames = getParamNames(fn);
		if (fnParamNames.length < 1 || fnParamNames.length > 2) {
			throw new Error(error.ArgFnInvalidParameterCount);
		}

		// make sure the cached method argument count and the cacheOptions.args match
		if (hasArgsInCacheOptions && fnParamNames.length !== 2) {
			throw new Error(error.ArgsSpecifiedWhenFnDoesntAcceptIt);
		}
		else if (!hasArgsInCacheOptions && fnParamNames.length !== 1) {
			throw new Error(error.ArgsMustSpecifiedWhenFnRequiresMultipleParams);
		}
	}