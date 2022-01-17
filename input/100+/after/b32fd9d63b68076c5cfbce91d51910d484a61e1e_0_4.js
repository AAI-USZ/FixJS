function (parentDef, names, overrideCallback) {
			var deps, count, len, i, name, completed, callback;

			deps = [];
			count = len = names.length;
			completed = false;
			callback = overrideCallback || parentDef.resolve;

			function checkDone () {
				if (--count == 0) {
					// Note: IE may have obtained the dependencies sync, thus the completed flag
					completed = true;
					callback(deps);
				}
			}

			function getDep (index, depName) {
				var childDef, doOnce;

				childDef = core.fetchDep(depName, parentDef);

				doOnce = function (dep) {
					deps[index] = dep; // got it!
					checkDone();
					// only run once for this dep (in case of early exports)
					doOnce = function () {};
				};

				function doSuccess (dep) {
					doOnce(dep);
				}

				function doFailure (ex) {
					completed = true;
					parentDef.reject(ex);
				}

				function doProgress (msg) {
					// only early-export to modules that also export since
					// pure AMD modules don't expect to get an early export
					// Note: this logic makes dojo 1.7 work, too.
					if (msg == msgUsingExports && parentDef.useExports) {
						doOnce(childDef.exports);
					}
				}

				// hook into promise callbacks.
				when(childDef, doSuccess, doFailure, doProgress);

			}

			// wait for preload before fetching any other modules
			when(parentDef.isPreload || preload, function () {

				for (i = 0; i < len && !completed; i++) {
					name = names[i];
					if (name in cjsVars) {
						// is this "require", "exports", or "module"?
						// if "exports" or "module" indicate we should grab exports
						if (name == 'exports') parentDef.useExports = true;
						if (name == 'module') parentDef.useModule = true;
						deps[i] = parentDef[name];
						checkDone();
					}
					// check for blanks. fixes #32.
					// this could also help with the has! plugin
					else if (names[i]) {
						getDep(i, names[i]);
					}
					else {
						checkDone();
					}
				}

				if (parentDef.useExports) {
					// announce
					parentDef.progress(msgUsingExports);
				}

				if (count == 0 && !completed) {
					// there were none to fetch
					callback(deps);
				}

			});

		}