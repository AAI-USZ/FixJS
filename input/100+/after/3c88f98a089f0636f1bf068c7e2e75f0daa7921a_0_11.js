function(global) {

	"use strict";

	var // misc variables
		x,
		odp,
		doc = global.document,
		el = doc.createElement("div"),

		// cached useful regexes
		commentRegExp = /(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg,
		cjsRequireRegExp = /[^.]require\(\s*["']([^'"\s]+)["']\s*\)/g,
		reservedModuleIdsRegExp = /exports|module/,
		pluginRegExp = /^(.+?)\!(.*)$/,
		notModuleRegExp = /(^\/)|(\:)|(\.js$)/,
		relativeRegExp = /^\./,
		packageNameRegExp = /([^\/]+)\/?(.*)/,
		urlRegExp = /^url\:(.+)/,
		isRegExp = /^\[object (.+)\]$/,

		// the global config settings
		cfg = global.require || {},

		// shortened packagePaths variable
		pp = cfg.packagePaths || {},

		// the number of seconds to wait for a script to load before timing out
		waitSeconds = (cfg.waitSeconds || 7) * 1000,

		baseUrl = cfg.baseUrl || "./",

		// CommonJS paths
		paths = cfg.paths || {},

		// feature detection results initialize by pre-calculated tests
		hasCache = cfg.hasCache || {},

		// a queue of module definitions to evaluate once a module has loaded
		defQ = [],

		// map of module ids to functions containing an entire module, which could
		// include multiple defines. when a dependency is not defined, the loader
		// will check the cache to see if it exists first before fetching from the
		// server. this is used when the build system bundles modules into the
		// minified javascript files.
		defCache = {},

		// map of package names to package resource definitions
		packages = {},

		// map of module ids to module resource definitions that are being loaded and processed
		waiting = {},

		// map of module ids to module resource definitions
		modules = {},

		// mixin of common functions
		fnMixin;

	/******************************************************************************
	 * Utility functions
	 *****************************************************************************/

	function noop() {}

	function _mix(dest, src) {
		for (var p in src) {
			src.hasOwnProperty(p) && (dest[p] = src[p]);
		}
		return dest;
	}

	function mix(dest) {
		// summary:
		//		Copies properties by reference from a source object to a destination
		//		object, then returns the destination object. To be clear, this will
		//		modify the dest being passed in.
		var i = 1;
		dest || (dest = {});
		while (i < arguments.length) {
			_mix(dest, arguments[i++]);
		}
		return dest;
	}

	function each(a, fn) {
		// summary:
		//		Loops through each element of an array and passes it to a callback
		//		function.
		var i = 0,
			l = (a && a.length) || 0,
			args = Array.prototype.slice.call(arguments, 0);
		args.shift();
		while (i < l) {
			args[0] = a[i++];
			fn.apply(null, args);
		}
	}

	function is(it, type) {
		// summary:
		//		Tests if "it" is a specific "type". If type is omitted, then
		//		it will return the type.
		//
		// returns:
		//		Boolean if type is passed in
		//		String of type if type is not passed in
		var t = it === void 0 ? "" : ({}).toString.call(it),
			m = t.match(isRegExp),
			v = m ? m[1] : "Undefined";
		return type ? type === v : v;
	}

	function isEmpty(it) {
		// summary:
		//		Checks if an object is empty.
		var p;
		for (p in it) {
			break;
		}
		return !it || (!it.call && !p);
	}

	function evaluate(code, sandboxVariables, globally) {
		// summary:
		//		Evaluates code globally or in a sandbox.
		//
		// code: String
		//		The code to evaluate
		//
		// sandboxVariables: Object?
		//		When "globally" is false, an object of names => values to initialize in
		//		the sandbox. The variable names must NOT contain '-' characters.
		//
		// globally: Boolean?
		//		When true, evaluates the code in the global namespace, generally "window".
		//		If false, then it will evaluate the code in a sandbox.

		var i,
			vars = [],
			vals = [],
			r;

		if (globally) {
			r = global.eval(code);
		} else {
			for (i in sandboxVariables) {
				vars.push(i + "=__vars." + i);
				vals.push(i + ":" + i);
			}
			r = (new Function("__vars", (vars.length ? "var " + vars.join(',') + ";\n" : "") + code + "\n;return {" + vals.join(',') + "};"))(sandboxVariables);
		}

		// if the last line of a module is a console.*() call, Firebug for some reason
		// sometimes returns "_firebugIgnore" instead of undefined or null
		return r === "_firebugIgnore" ? null : r;
	}

	function compactPath(path) {
		var result = [],
			segment,
			lastSegment;
		path = path.replace(/\\/g, '/').split('/');
		while (path.length) {
			segment = path.shift();
			if (segment === ".." && result.length && lastSegment !== "..") {
				result.pop();
				lastSegment = result[result.length - 1];
			} else if (segment !== ".") {
				result.push(lastSegment = segment);
			}
		}
		return result.join("/");
	}

	/******************************************************************************
	 * has() feature detection
	 *****************************************************************************/

	function has(name) {
		// summary:
		//		Determines of a specific feature is supported.
		//
		// name: String
		//		The name of the test.
		//
		// returns: Boolean (truthy/falsey)
		//		Whether or not the feature has been detected.

		if (is(hasCache[name], "Function")) {
			hasCache[name] = hasCache[name](global, doc, el);
		}
		return hasCache[name];
	}

	has.add = function hasAdd(name, test, now, force){
		// summary:
		//		Adds a feature test.
		//
		// name: String
		//		The name of the test.
		//
		// test: Function
		//		The function that tests for a feature.
		//
		// now: Boolean?
		//		If true, runs the test immediately.
		//
		// force: Boolean?
		//		If true, forces the test to override an existing test.

		if (hasCache[name] === void 0 || force) {
			hasCache[name] = test;
		}
		return now && has(name);
	};

	/******************************************************************************
	 * Event handling
	 *****************************************************************************/

	function on(target, type, context, listener) {
		// summary:
		//		Connects a listener to an event on the specified target.
		//
		// target: Object|DomNode
		//		The target to add the event listener to.
		//
		// type: String
		//		The event to listen for.
		//
		// context: Object|Function
		//		When listener is defined, the context is the scope in which the listener
		//		is executed.
		//
		// listener: Function?|String?
		//		Optional. When present, the context is used as the scope.
		//
		// example:
		//		Attaching to a click event:
		//		|	on(myButton, "click", function() {
		//		|		alert("Howdy!");
		//		|	});
		//
		// example:
		//		Attaching to a click event within a declared class method:
		//		|	...
		//		|	constructor: function() {
		//		|		require.on(myButton, "click", this, "onButtonClick");
		//		|	},
		//		|	onButtonClick: function() {
		//		|		alert("Howdy from " + this.declaredClass + "!");
		//		|	}
		//		|	...
		//
		// example:
		//		Attaching to a click event with an anonymous function in a declared class:
		//		|	...
		//		|	constructor: function() {
		//		|		require.on(myButton, "click", this, function() {
		//		|			alert("Howdy from " + this.declaredClass + "!");
		//		|		});
		//		|	}
		//		|	...

		var cb = is(listener, "Function") ? function() {
			return listener.apply(context, arguments);
		} : is(listener, "String") ? function() {
			return context[listener].apply(context, arguments);
		} : context;

		target.addEventListener(type, cb, false);
		return function() {
			target.removeEventListener(type, cb, false);
		};
	}

	on.once = function(target, type, listener) {
		var h = on(target, type, function() {
			h && h(); // do the disconnect
			return listener.apply(this, arguments);
		});
		return h;
	};

	/******************************************************************************
	 * Promise
	 *****************************************************************************/

	function Promise() {
		this.thens = arguments.length ? [arguments] : [];
	}

	mix(Promise.prototype, {

		then: function promiseThen() {
			this.thens.push(arguments);
			return this;
		},

		resolve: function promiseResolve() {
			this._complete(0, arguments);
		},

		reject: function promiseReject(ex) {
			this._complete(1, ex);
		},

		_complete: function promiseComplete(fnIdx, result) {
			this.then = fnIdx ? function promiseCompleteReject(resolved, rejected) { rejected && rejected(result); }
			                   : function promiseCompleteResolve(resolved) { resolved && resolved.apply(null, result); };
			this._complete = noop;

			for (var i = 0, thens = this.thens, len = thens.length, fn; i < len;) {
				fn = thens[i++][fnIdx];
				fn && fn.apply(null, result);
			}

			delete this.thens;
		}

	});

	/******************************************************************************
	 * Configuration processing
	 *****************************************************************************/

	// make sure baseUrl ends with a slash
	if (!/\/$/.test(baseUrl)) {
		baseUrl += "/";
	}

	function configPackage(/*String|Object*/pkg, /*String?*/dir) {
		// summary:
		//		An internal helper function to configure a package and add it to the array
		//		of packages.
		//
		// pkg: String|Object
		//		The name of the package (if a string) or an object containing at a minimum
		//		the package's name, but possibly also the package's location and main
		//		source file
		//
		// dir: String?
		//		Optional. A base URL to prepend to the package location

		pkg = pkg.name ? pkg : { name: pkg };
		pkg.location = (/(^\/)|(\:)/.test(dir) ? dir : "") + (pkg.location || pkg.name);
		pkg.main = (pkg.main || "main").replace(/(^\.\/)|(\.js$)/, "");
		packages[pkg.name] = pkg;
	}

	// first init all packages from the config
	each(cfg.packages, configPackage);

	// second init all package paths and their packages from the config
	for (x in pp) {
		each(pp[x], configPackage, x + "/");
	}

	// run all feature detection tests
	for (x in cfg.has) {
		has.add(x, cfg.has[x], 0, true);
	}

	/******************************************************************************
	 * Module functionality
	 *****************************************************************************/

	function ResourceDef(name, refModule, deps, rawDef) {
		// summary:
		//		A resource definition that describes a file or module being loaded.
		//
		// description:
		//		A resource is anything that is "required" such as applications calling
		//		require() or a define() with dependencies.
		//
		//		This loader supports resources that define multiple modules, hence this
		//		object.
		//
		//		In addition, this object tracks the state of the resource (loaded,
		//		executed, etc) as well as loads a resource and executes the defintions.
		//
		// name: String
		//		The module id.
		//
		// deps: Array?
		//		An array of dependencies.
		//
		// rawDef: Object? | Function? | String?
		//		The object, function, or string that defines the resource.
		//
		// refModule: Object?
		//		A reference map used for resolving module URLs.

		var match = name && name.match(pluginRegExp),
			isRelative = relativeRegExp.test(name),
			notModule = notModuleRegExp.test(name),
			exports = {},
			pkg = null,
			cjs,
			i,
			len,
			m,
			p,
			url = baseUrl,
			_t = this;

		// name could be:
		//  - a plugin		text!/some/file.html or include!/some/file.js
		//  - a module		some/module, ../some/module
		//  - a js file		/some/file.js
		//  - a url			http://www.google.com/

		_t.name = name;
		_t.deps = deps || [];
		_t.plugin = null;

		if (!match && (notModule || (isRelative && !refModule))) {
			_t.url = name;
		} else {
			if (match) {
				_t.plugin = _t.deps.length;
				_t.pluginArgs = match[2];
				_t.pluginCfg = cfg[match[1]];
				_t.deps.push(match[1]);
			} else if (name) {
				name = _t.name = compactPath((isRelative ? refModule.name + "/../" : "") + name);

				if (relativeRegExp.test(name)) {
					throw new Error("Irrational path \"" + name + "\"");
				}

				if (cfg.packages && (match = name.match(packageNameRegExp))) {
					for (i = 0, len = cfg.packages.length, m = match[1]; i < len; i++) {
						p = cfg.packages[i];
						if (p.name === m) {
							pkg = m;
							/\/$/.test(i = p.location) || (i += '/');
							url += compactPath(i + (match[2] ? name : p.main));
							break;
						}
					}
				}

				// MUST set pkg to anything other than null, even if this module isn't in a package
				if (!pkg || (!match && notModule)) {
					pkg = "";
					url += name;
				}

				_t.url = url + ".js";
			}
		}

		_t.pkg = pkg;
		_t.rawDef = rawDef;
		_t.loaded = !!rawDef;
		_t.refModule = refModule;

		// our scoped require()
		function scopedRequire() {
			var args = Array.prototype.slice.call(arguments, 0);
			args.length > 1 || (args[1] = 0);
			args[2] = _t;
			return req.apply(null, args);
		}
		scopedRequire.toUrl = function scopedToUrl() {
			var args = Array.prototype.slice.call(arguments, 0);
			_t.plugin === null && (args[1] = _t);
			return toUrl.apply(null, args);
		};
		mix(scopedRequire, fnMixin, {
			cache: req.cache
		});

		_t.cjs = {
			require: scopedRequire,
			exports: exports,
			module: {
				exports: exports
			}
		};
	}

	ResourceDef.prototype.loadAndExecute = function loadAndExecute(sync, callback) {
		// summary:
		//		Retreives a remote script and inject it either by XHR (sync) or attaching
		//		a script tag to the DOM (async). Once the resource is loaded, it will be
		//		executed.
		//
		// sync: Boolean
		//		If true, uses XHR, otherwise uses a script tag.
		//
		// callback: Function?
		//		A function to call when sync is false and the script tag loads and executes.

		var s,
			x,
			scriptTagLoadEvent,
			scriptTagErrorEvent,
			_t = this,
			name = _t.name,
			cached = defCache[name];

		function onLoad(rawDef) {
			_t.loaded = 1;
			// if rawDef is undefined, then we're loading async
			if (_t.rawDef = rawDef) {
				if (is(rawDef, "String")) {
					// if rawDef is a string, then it's either a cached string or xhr response.
					// the string could contain an AMD module or CommonJS module
					if (/\.js$/.test(_t.url)) {
						rawDef = evaluate(rawDef, _t.cjs);
						_t.def = _t.rawDef = !isEmpty(rawDef.exports) ? rawDef.exports : (rawDef.module && !isEmpty(rawDef.module.exports) ? rawDef.module.exports : null);
						_t.def === null && (_t.rawDef = rawDef);
					} else {
						_t.def = rawDef;
						_t.executed = 1;
					}
				} else if (is(rawDef, "Function")) {
					// if rawDef is a function, then it's a cached module definition
					waiting[name] = _t;
					rawDef();
				}
			}

			// we need to process the definition queue just in case the rawDef fired define()
			processDefQ(_t) || _t.execute();
		}

		function disconnect() {
			scriptTagLoadEvent && scriptTagLoadEvent();
			scriptTagErrorEvent && scriptTagErrorEvent();
		}

		function failed() {
			modules[name] = 0;
			delete waiting[name];
			disconnect();
		}

		(_t._postLoadExecutePromise || (_t._postLoadExecutePromise = new Promise)).then(callback);

		// if we don't have a url, then I suppose we're loaded
		if (_t.executed || !_t.url) {
			_t.loaded = 1;
			_t.execute();
			return;
		}

		// if we're already waiting, then we can just return and our callback will be fired
		if (waiting[name]) {
			return;
		}

		// if we're already loaded or the definition has been cached, then just return now
		if (_t.loaded || cached) {
			delete defCache[name];
			onLoad(cached);
		}

		// mark this module as waiting to be loaded so that anonymous modules can be
		// identified
		waiting[name] = _t;

		if (_t.sync = sync) {
			x = new XMLHttpRequest();
			x.open("GET", _t.url, false);
			x.send(null);

			if (x.status === 200) {
				onLoad(x.responseText);
			} else {
				failed();
				throw new Error("Failed to load module \"" + name + "\": " + x.status);
			}
		} else {
			// insert the script tag, attach onload, wait
			x = _t.node = doc.createElement("script");
			x.type = "text/javascript";
			x.charset = "utf-8";
			x.async = true;

			scriptTagLoadEvent = on(x, "load", function onScriptTagLoad(e) {
				e = e || global.event;
				var node = e.target || e.srcElement;
				if (e.type === "load" || /complete|loaded/.test(node.readyState)) {
					disconnect();
					onLoad();
				}
			});

			scriptTagErrorEvent = on(x, "error", failed);

			// set the source url last
			x.src = _t.url;

			s = doc.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(x, s);
		}
	};

	ResourceDef.prototype.execute = function execute(callback) {
		// summary:
		//		Executes the resource's rawDef which defines the module.
		//
		// callback: Function?
		//		A function to call after the module has been executed.

		var _t = this,
			promise = _t._postLoadExecutePromise,
			resolve = promise.resolve;

		callback && promise.then(callback);

		if (_t.executed) {
			resolve.call(promise, _t);
			return;
		}

		// first need to make sure we have all the deps loaded
		req(_t, function onExecuteDepsLoaded() {
			var i,
				p,
				r = _t.rawDef,
				q = defQ.slice(0); // backup the defQ

			function finish() {
				_t.executed = 1;
				resolve.call(promise, _t);
			}

			// need to wipe out the defQ
			defQ = [];

			_t.def = _t.def
				||	(r && (is(r, "String")
						? evaluate(r, _t.cjs)
						: is(r, "Function")
							? r.apply(null, arguments)
							: is(r, "Object")
								?	(function(obj, vars) {
										for (var i in vars) {
											this[i] = vars[i];
										}
										return obj;
									}).call({}, r, _t.cjs)
								: null
						)
					)
				|| _t.cjs.module.exports || _t.cjs.exports;

			// we might have just executed code above that could have caused a couple
			// define()'s to queue up
			processDefQ(_t);

			// restore the defQ
			defQ = q;

			// if plugin is not null, then it's the index in the deps array of the plugin
			// to invoke
			if (_t.plugin !== null) {
				p = arguments[_t.plugin];

				// the plugin's content is dynamic, so just remove from the module cache
				if (p.dynamic) {
					delete modules[_t.name];
				}

				// if the plugin has a load function, then invoke it!
				p.load && p.load(_t.pluginArgs, _t.cjs.require, function onPluginRun(v) {
					_t.def = v;
					finish();
				}, _t.pluginCfg);
			}

			(p && p.load) || finish();
		}, _t.refModule, _t.sync);
	};

	function getResourceDef(name, refModule, deps, rawDef, dontCache, overrideCache) {
		// summary:
		//		Creates a new resource definition or returns an existing one from cache.

		var module = new ResourceDef(name, refModule, deps, rawDef),
			moduleName = module.name;

		if (refModule && refModule.cjs && name in refModule.cjs) {
			module.def = refModule.cjs[name];
			module.loaded = module.executed = 1;
			return module;
		}

		return dontCache || !moduleName ? module : (!modules[moduleName] || !modules[moduleName].executed || overrideCache ? (modules[moduleName] = module) : modules[moduleName]);
	}

	function processDefQ(module) {
		// summary:
		//		Executes all modules sitting in the define queue.
		//
		// description:
		//		When a resource is loaded, the remote AMD resource is fetched, it's
		//		possible that one of the define() calls was anonymous, so it should
		//		be sitting in the defQ waiting to be executed.

		var m,
			q = defQ.slice(0),
			r = 0;
		defQ = [];

		while (q.length) {
			m = q.shift();

			// if the module is anonymous, assume this module's name
			m.name || (m.name = module.name);

			// if the module is this module, then modify this 
			if (m.name === module.name) {
				modules[m.name] = module;
				module.deps = m.deps;
				module.rawDef = m.rawDef;
				module.refModule = m.refModule;
				module.execute();
				r = 1;
			} else {
				modules[m.name] = m;
				m.execute();
			}
		}

		delete waiting[module.name];
		return r;
	}

	function def(name, deps, rawDef) {
		// summary:
		//		Used to define a module and it's dependencies.
		//
		// description:
		//		Defines a module. If the module has any dependencies, the loader will
		//		resolve them before evaluating the module.
		//
		//		If any of the dependencies fail to load or the module definition causes
		//		an error, the entire definition is aborted.
		//
		// name: String|Array?
		//		Optional. The module name (if a string) or array of module IDs (if an array) of the module being defined.
		//
		// deps: Array?
		//		Optional. An array of module IDs that the rawDef being defined requires.
		//
		// rawDef: Object|Function
		//		An object or function that returns an object defining the module.
		//
		// example:
		//		Anonymous module, no deps, object definition.
		//
		//		Loader tries to detect module name, fails and ignores definition if more
		//		unable to determine name or there's already anonymous module tied to the
		//		name found.
		//
		//		If the module name is determined, then the module definition
		//		is immediately defined.
		//
		//		|	define({
		//		|		sq: function(x) { return x * x; }
		//		|	});
		//
		// example:
		//		Anonymous module, no deps, rawDef definition.
		//
		//		Loader tries to detect module name, fails and ignores definition if more
		//		unable to determine name or there's already anonymous module tied to the
		//		name found.
		//
		//		Since no deps, module definition is treated as a CommonJS module and is
		//		passed in passed require, exports, and module arguments, then immediately
		//		evaluated.
		//
		//		|	define(function(require, exports, module) {
		//		|		return {
		//		|			sq: function(x) { return x * x; }
		//		|		};
		//		|	});
		//
		// example:
		//		Named module, no deps, object definition.
		//
		//		Since no deps, the module definition is immediately defined.
		//
		//		|	define("arithmetic", {
		//		|		sq: function(x) { return x * x; }
		//		|	});
		//
		// example:
		//		Named module, no deps, rawDef definition.
		//
		//		Since no deps, module definition is treated as a CommonJS module and is
		//		passed in passed require, exports, and module arguments, then immediately
		//		evaluated.
		//
		//		|	define("arithmetic", function(require, exports, module) {
		//		|		return {
		//		|			sq: function(x) { return x * x; }
		//		|		};
		//		|	});
		//
		// example:
		//		Anonymous module, two deps, object definition.
		//
		//		Loader tries to detect module name, fails and ignores definition if more
		//		unable to determine name or there's already anonymous module tied to the
		//		name found.
		//
		//		If the module name is determined, then the loader will load the two
		//		dependencies, then once the dependencies are loaded, it will evaluate a
		//		function wrapper around the module definition.
		//
		//		|	define(["dep1", "dep2"], {
		//		|		sq: function(x) { return x * x; }
		//		|	});
		//
		// example:
		//		Anonymous module, two deps, function definition.
		//
		//		Loader tries to detect module name, fails and ignores definition if more
		//		unable to determine name or there's already anonymous module tied to the
		//		name found.
		//
		//		If the module name is determined, then the loader will load the two
		//		dependencies, then once the dependencies are loaded, it will evaluate
		//		the rawDef function.
		//
		//		|	define(["dep1", "dep2"], function(dep1, dep2) {
		//		|		return {
		//		|			sq: function(x) { return x * x; }
		//		|		};
		//		|	});
		//
		// example:
		//		Name module, two deps, object definition.
		//
		//		After the two dependencies are loaded, the loader will evaluate a
		//		function wrapper around the module definition.
		//
		//		|	define("arithmetic", ["dep1", "dep2"], {
		//		|		sq: function(x) { return x * x; }
		//		|	});
		//
		// example:
		//		Name module, two deps, function definition.
		//
		//		After the two dependencies are loaded, the loader will evaluate the
		//		function rawDef.
		//
		//		|	define("arithmetic", ["dep1", "dep2"], function(dep1, dep2) {
		//		|		return {
		//		|			sq: function(x) { return x * x; }
		//		|		};
		//		|	});

		var i = ["require", "exports", "module"],
			module;

		if (!rawDef) {
			rawDef = deps || name;
			//rawDef.length === 1 || (i = i.concat(["exports", "module"]));
			if (typeof name !== "string") {
				deps = deps ? name : i;
				name = 0;
			} else {
				deps = i;
			}
		}

		if (reservedModuleIdsRegExp.test(name)) {
			throw new Error("Not allowed to define reserved module id \"" + name + "\"");
		}

		if (is(rawDef, "Function") && arguments.length === 1) {
			// treat rawDef as CommonJS definition and scan for any requires and add
			// them to the dependencies so that they can be loaded and passed in.
			rawDef.toString()
				.replace(commentRegExp, "")
				.replace(cjsRequireRegExp, function(match, dep) {
					deps.push(dep);
				});
		}

		module = getResourceDef(name, 0, deps, rawDef, 0, 1);

		// if not waiting for this module to be loaded, then the define() call was
		// possibly inline or deferred, so try fulfill dependencies, and define the
		// module right now.
		if (name && !waiting[name]) {
			module.execute();

		// otherwise we are definitely waiting for a script to load, eventhough we
		// may not know the name, we'll know when the script's onload fires.
		} else if (name || !isEmpty(waiting)) {
			defQ.push(module);

		// finally, we we're ask to define something without a name and there's no
		// scripts pending, so there's no way to know what the name is. :(
		} else {
			throw new Error("Unable to define anonymous module");
		}
	}

	// set the "amd" property and advertise supported features
	def.amd = {
		plugins: true,
		vendor: "titanium"
	};

	function toUrl(name, refModule) {
		// summary:
		//		Converts a module name including extension to a URL path.
		//
		// name: String
		//		The module name including extension.
		//
		// returns: String
		//		The fully resolved URL.
		//
		// example:
		//		Returns the URL for a HTML template file.
		//		|	define(function(require) {
		//		|		var templatePath = require.toUrl("./templates/example.html");
		//		|	});

		var	match = name.match(/(.+)(\.[^\/\.]+?)$/),
			module = getResourceDef((match && match[1]) || name, refModule, 0, 0, 1),
			url = module.url;

		module.pkg !== null && (url = url.substring(0, url.length - 3));
		return url + ((match && match[2]) || "");
	}

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

	req.toUrl = toUrl;
	mix(req, fnMixin = {
		config: cfg,
		each: each, // TODO: Remove this once require.each() has been removed from code base
		evaluate: evaluate,
		has: has,
		is: is,
		mix: mix,
		on: on
	});

	req.cache = function requireCache(subject) {
		// summary:
		//		Copies module definitions into the definition cache.
		//
		// description:
		//		When running a build, the build will call this function and pass in an
		//		object with module id => function. Each function contains the contents
		//		of the module's file.
		//
		//		When a module is required, the loader will first see if the module has
		//		already been defined.  If not, it will then check this cache and execute
		//		the module definition.  Modules not defined or cached will be fetched
		//		remotely.
		//
		// subject: String | Object
		//		When a string, returns the cached object or undefined otherwise an object
		//		with module id => function where each function wraps a module.
		//
		// example:
		//		This shows what build system would generate. You should not need to do this.
		//		|	require.cache({
		//		|		"arithmetic": function() {
		//		|			define(["dep1", "dep2"], function(dep1, dep2) {
		//		|				var api = { sq: function(x) { return x * x; } };
		//		|			});
		//		|		},
		//		|		"my/favorite": function() {
		//		|			define({
		//		|				color: "red",
		//		|				food: "pizza"
		//		|			});
		//		|		}
		//		|	});
		var p, m;
		if (is(subject, "String")) {
			return defCache[subject];
		} else {
			for (p in subject) {
				m = p.match(urlRegExp);
				if (m) {
					defCache[toUrl(m[1])] = subject[p];
				} else {
					m = getResourceDef(p, 0, 0, subject[p], 1);
					defCache[m.name] = m.rawDef;
				}
			}
		}
	};

	// expose require() and define() to the global namespace
	global.require = req;
	global.define = def;

}