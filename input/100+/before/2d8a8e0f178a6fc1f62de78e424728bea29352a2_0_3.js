function _curl (/* various */) {

		var args = [].slice.call(arguments);

		// extract config, if it's specified
		if (isType(args[0], 'Object')) {
			userCfg = core.config(args.shift(), {});
		}

		// thanks to Joop Ringelberg for helping troubleshoot the API
		function CurlApi (ids, callback, waitFor) {
			var then, ctx;
			ctx = core.createContext(userCfg, undef, [].concat(ids));
			this['then'] = then = function (resolved, rejected) {
				when(ctx,
					// return the dependencies as arguments, not an array
					function (deps) {
						if (resolved) resolved.apply(undef, deps);
					},
					// just throw if the dev didn't specify an error handler
					function (ex) {
						if (rejected) rejected(ex); else throw ex;
					}
				);
				return this;
			};
			this['next'] = function (ids, cb) {
				// chain api
				return new CurlApi(ids, cb, ctx);
			};
			if (callback) then(callback);
			when(waitFor, function () { core.getDeps(ctx); });
		}

		return new CurlApi(args[0], args[1]);

	}