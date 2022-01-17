function createModule(spec, name) {

			// Look for a factory, then use it to create the object
			return when(findFactory(spec),
				function (factory) {
					var factoryPromise = defer();

					if (!spec.id) spec.id = name;

					factory(factoryPromise.resolver, spec, pluginApi);

					return when(factoryPromise, function(component) {
						return when(modulesReady, function() {
							return lifecycle.startup(createProxy(component, spec));
						});
					});
				},
				function () {
					// No factory found, treat object spec as a nested scope
					return createScope(spec, scope, { name: name });
				}
			);
		}