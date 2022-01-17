function parseSpec(scopeDef, scopeReady) {
			var promises = [];

			// Setup a promise for each item in this scope
			for (var name in scopeDef) {
				promises.push(components[name] = defer());
			}

			// When all scope item promises are resolved, the scope
			// is ready. When this scope is ready, resolve the promise
			// with the objects that were created
			chain(whenAll(promises), scopeReady, components);
		}