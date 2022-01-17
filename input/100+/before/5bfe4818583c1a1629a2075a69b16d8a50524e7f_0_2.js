function wireFactory(resolver, spec, wire) {
			//
			// TODO: Move wireFactory to its own module
			//
			var options, module, get, provide, defer, waitParent;

			options = spec.wire;

			// Get child spec and options
			if (isString(options)) {
				module = options;
			} else {
				module = options.spec;
				waitParent = options.waitParent;
				defer = options.defer;
				get = options.get;
				provide = options.provide;
			}

			// Trying to use both get and defer is an error
			if(defer && get) {
				return resolver.reject("you can't use defer and get at the same time");
			}

			function init(components) {
				if(provide) {
					return when(wire(provide), function(provides) {
						safeMixin(components, provides);
					});
				}
			}

			function createChild(/** {Object|String}? */ mixin) {
				var spec = mixin ? [].concat(module, mixin) : module;

				return wireChild(spec, { init: init });
			}

			if (defer) {
				// Resolve with the createChild *function* itself
				// which can be used later to wire the spec
				resolver.resolve(createChild);

			} else if (get) {
				// Wire a new scope, and get a named component from it to use
				// as the component currently being wired.
				return when(createChild(spec), function(scope) {
					return resolveRefName(get, {}, scope);
				}).then(resolver.resolve, resolver.reject);

			} else if(waitParent) {

				var childPromise = when(scopeReady, function() {
					return createChild();
				});

				resolver.resolve(new ResolvedValue(childPromise));

			} else {
				resolver.resolve(createChild());

			}
		}