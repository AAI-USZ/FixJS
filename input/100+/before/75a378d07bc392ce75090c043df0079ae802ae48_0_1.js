function initFromParent(parent) {
			local = {};

			// Descend scope and plugins from parent so that this scope can
			// use them directly via the prototype chain
			objects = initWireApi(delegate(parent.objects || {}));
			resolvers = delegate(parent.resolvers || {});
			factories = delegate(parent.factories || {});
			facets = delegate(parent.facets || {});


			// Set/override integral resolvers and factories
			resolvers.wire   = wireResolver;

			factories.module = moduleFactory;
			factories.create = instanceFactory;
			factories.wire   = wireFactory;

			listeners = delegateArray(parent.listeners);// ? [].concat(parent.listeners) : [];

			// Proxies is an array, have to concat
			proxies = delegateArray(parent.proxies);// ? [].concat(parent.proxies) : [];
			proxied = [];

			modulesToLoad = [];
			moduleLoadPromises = {};
			modulesReady = defer();

			scopeReady = defer();
			scopeDestroyed = defer();

			// A proxy of this scope that can be used as a parent to
			// any child scopes that may be created.
			scopeParent = {
				name: scopeName,
				objects: objects,
				destroyed: scopeDestroyed
			};

			// Full scope definition.  This will be given to sub-scopes,
			// but should never be given to child contexts
			scope = delegate(scopeParent);

			scope.local = local;
			scope.resolvers = resolvers;
			scope.factories = factories;
			scope.facets = facets;
			scope.listeners = listeners;
			scope.proxies = proxies;
			scope.resolveRef = doResolveRef;
			scope.destroy = destroy;
			scope.path = createPath(scopeName, parent.path);

			// When the parent begins its destroy phase, this child must
			// begin its destroy phase and complete it before the parent.
			// The context hierarchy will be destroyed from child to parent.
			if (parent.destroyed) {
				when(parent.destroyed, destroy);
			}
		}