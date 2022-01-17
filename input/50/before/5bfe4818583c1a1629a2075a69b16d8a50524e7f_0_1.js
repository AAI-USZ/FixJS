function() {

			parseSpec(scopeDef, scopeReady);

			createComponents(scopeDef);

			// Once all modules are loaded, all the components can finish
			ensureAllModulesLoaded();

			// Return promise
			// Context will be ready when this promise resolves
			return scopeReady.promise;

		}