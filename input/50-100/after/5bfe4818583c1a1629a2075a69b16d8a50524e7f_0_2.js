function parseSpec(scopeDef, scopeReady) {
			var promises, componentsToCreate;

			promises = [];
			componentsToCreate = {};

			// Setup a promise for each item in this scope
			for (var name in scopeDef) {
				// An initializer may have inserted concrete components
				// into the context.  If so, they override components of the
				// same name from the input spec
				if(!(components.hasOwnProperty(name))) {
					promises.push(componentsToCreate[name] = components[name] = defer());
				}
			}

			// When all scope item promises are resolved, the scope
			// is ready. When this scope is ready, resolve the promise
			// with the objects that were created
			chain(whenAll(promises), scopeReady, components);

			return componentsToCreate;
		}