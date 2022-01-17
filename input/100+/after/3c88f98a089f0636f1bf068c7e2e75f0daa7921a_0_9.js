function req(deps, callback, refModule, sync) {
		// summary:
		//		Fetches a module, caches its definition, and returns the module. If an
		//		array of modules is specified, then after all of them have been
		//		asynchronously loaded, an optional callback is fired.
		//
		// deps: String | Array | Object
		//		A string or array of strings containing valid module identifiers.
		//
		// callback: Function?
		//		Optional. A function that is fired after all dependencies have been
		//		loaded. Only applicable if deps is an array.
		//
		// refModule: Object?
		//		A reference map used for resolving module URLs.
		//
		// sync: Boolean?
		//		Forces the async path to be sync.
		//
		// returns: Object | Promise
		//		If calling with a string, it will return the corresponding module
		//		definition, otherwise it returns a Promise for the async loading.
		//
		// example:
		//		Synchronous call.
		//		|	require("arithmetic").sq(10); // returns 100
		//
		// example:
		//		Asynchronous call.
		//		|	require(["arithmetic", "convert"], function(arithmetic, convert) {
		//		|		convert(arithmetic.sq(10), "fahrenheit", "celsius"); // returns 37.777
		//		|	});

		var i = 0,
			l,
			count,
			type = is(deps),
			s = type === "String",
			promise = new Promise(callback),
			resolve = promise.resolve;

		if (type === "Object") {
			refModule = deps;
			deps = refModule.deps;
		}

		if (s) {
			deps = [deps];
			sync = 1;
		}

var blah = [];
deps.forEach(function(f){
	blah.push(is(f, "String") ? f : "Object");
});
console.debug("require([" + blah.join(', ') + "])");

		for (l = count = deps.length; i < l;) {
			(function requireDepClosure(j) {
				deps[j] && getResourceDef(deps[j], refModule).loadAndExecute(!!sync, function onLoadAndExecute(m) {
					deps[j] = m.def;
					if (--count === 0) {
						resolve.apply(promise, deps);
						count = -1; // prevent success from being called the 2nd time below
					}
				});
			}(i++));
		}

		count === 0 && resolve.apply(promise, deps);
		return s ? deps[0] : promise;
	}