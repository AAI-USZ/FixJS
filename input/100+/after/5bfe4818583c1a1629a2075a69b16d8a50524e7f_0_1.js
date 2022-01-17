function destroyContext() {
			var shutdown;

			scopeDestroyed.resolve();

			// TODO: Clear out the context prototypes?

			shutdown = when.reduce(proxiedComponents, function(unused, proxied) {
				return lifecycle.shutdown(proxied);
			}, undef);

			return when(shutdown, function () {
				var i, len;

				function deleteAll(container) {
					for(var p in container) delete container[p];
				}

				deleteAll(components);
				deleteAll(scope);

				for(i = 0, len = proxiedComponents.length; i < len; i++) {
					proxiedComponents[i].destroy();
				}

				// Free Objects
				components = scope = parent
					= resolvers = factories = facets = listeners
					= wireApi = proxiedComponents = proxiers = plugins
					= undef;

				return scopeDestroyed;
			});
		}