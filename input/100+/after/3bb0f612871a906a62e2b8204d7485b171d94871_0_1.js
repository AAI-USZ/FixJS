function _curl (/* various */) {

		var args = [].slice.call(arguments), ids;

		// extract config, if it's specified
		if (isType(args[0], 'Object')) {
			userCfg = core.extractCfg(args.shift());
			core.checkPreloads(userCfg);
		}

		// thanks to Joop Ringelberg for helping troubleshoot the API
		function CurlApi (ids, callback, waitFor) {
			var then, def;
			def = core.createResourceDef('*', userCfg, false, '');
			this['then'] = then = function (resolved, rejected) {
				when(def,
					// return the dependencies as arguments, not an array
					function (deps) { if (resolved) resolved.apply(undef, deps); },
					// just throw if the dev didn't specify an error handler
					function (ex) { if (rejected) rejected(ex); else throw ex; }
				);
				return this;
			};
			this['next'] = function (ids, cb) {
				// chain api
				return new CurlApi(ids, cb, def);
			};
			if (callback) then(callback);
			when(waitFor, function () {
				core.getDeps(def, [].concat(ids));
			});
		}

		ids = [].concat(args[0]); // force to array TODO: create unit test
		return new CurlApi(ids, args[1]);

	}