function findFactory(spec) {

			// FUTURE: Should not have to wait for all modules to load,
			// but rather only the module containing the particular
			// factory we need.  But how to know which factory before
			// they are all loaded?
			// Maybe need a special syntax for factories, something like:
			// create: "factory!whatever-arg-the-factory-takes"
			// args: [factory args here]

			function getFactory() {
				var f, factory;

				for (f in factories) {
					if (spec.hasOwnProperty(f)) {
						factory = factories[f];
						break;
					}
				}

				// Intentionally returns undefined if no factory found
				return factory;
			}

			return getFactory() || when(modulesReady, function () {
				return getFactory() || when.reject(spec);
			});
		}