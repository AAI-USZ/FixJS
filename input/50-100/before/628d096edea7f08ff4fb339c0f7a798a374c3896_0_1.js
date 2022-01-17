function configureContext(options) {
			// TODO: This configuration object needs to be abstracted and reused
			config = {
				lifecycleSteps: lifecycleSteps,
				pluginApi: pluginApi,
				resolvers: resolvers,
				facets: facets,
				listeners: listeners
			};

			lifecycle = new Lifecycle(config);
			resolver = new Resolver(config);

			contextHandlers = {
				init: array.delegate(options.init),
				destroy: array.delegate(options.destroy)
			};
		}