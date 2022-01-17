function createScope(scopeDef, parent, scopeName) {
		var scope, scopeParent, local, proxied, objects,
				pluginApi, resolvers, factories, facets, listeners, proxies,
				modulesToLoad, moduleLoadPromises,
				wireApi, modulesReady, scopeReady, scopeDestroyed,
				contextPromise, doDestroy;

		// Empty parent scope if none provided
		parent = parent || {};

		initFromParent(parent);
		initPluginApi();

		// TODO: Find a better way to load and scan the base plugin
		scanPlugin(basePlugin);

		contextPromise = initContextPromise(scopeDef, scopeReady);

		createComponents(local, scopeDef);

		// Once all modules are loaded, all the components can finish
		ensureAllModulesLoaded();

		// Setup overwritable doDestroy so that this context
		// can only be destroyed once
		doDestroy = function () {
			// Retain a do-nothing doDestroy() func, in case
			// it is called again for some reason.
			doDestroy = function () {
			};

			return destroyContext();
		};

		// Return promise
		// Context will be ready when this promise resolves
		return scopeReady.promise;

		//
		// Initialization
		//

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
			factories.resolve = resolverFactory;

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

		function initWireApi(objects) {
			wireApi = objects.wire = wireChild;
			wireApi.destroy = objects.destroy = apiDestroy;

			// Consider deprecating resolve
			// Any reference you could resolve using this should simply be
			// injected instead.
			wireApi.resolve = objects.resolve = apiResolveRef;

			return delegate(objects);
		}

		function initPluginApi() {
			// Plugin API
			// wire() API that is passed to plugins.
			pluginApi = function (spec, name, path) {
				// Why the promise trickery here?
				// Some factory deep in the promise chain (see wireFactory, for example)
				// may need to actually return a promise *as the result of wiring*, and not
				// have it be resolved in the chain.  So, it may return
				var d = defer();
				when(createItem(spec, createPath(name, path)), function(val) {
					d.resolve(getResolvedValue(val));
				}, d.reject);

				return d.promise;
			};

			pluginApi.resolveRef = apiResolveRef;
		}

		function initContextPromise(scopeDef, scopeReady) {
			var promises = [];

			// Setup a promise for each item in this scope
			for (var name in scopeDef) {
				if (scopeDef.hasOwnProperty(name)) {
					promises.push(local[name] = objects[name] = defer());
				}
			}

			// When all scope item promises are resolved, the scope
			// is resolved.
			// When this scope is ready, resolve the contextPromise
			// with the objects that were created
			return chain(whenAll(promises), scopeReady, objects);
		}

		//
		// Context Startup
		//

		function createComponents(names, scopeDef) {
			// Process/create each item in scope and resolve its
			// promise when completed.
			for (var name in names) {
				// No need to check hasOwnProperty since we know names
				// only contains scopeDef's own prop names.
				createScopeItem(name, scopeDef[name], objects[name]);
			}
		}

		function ensureAllModulesLoaded() {
			// Once all modules have been loaded, resolve modulesReady
			whenAll(modulesToLoad, function (modules) {
				modulesReady.resolve(modules);
				moduleLoadPromises = modulesToLoad = null;
			});
		}

		//
		// Context Destroy
		//

		function destroyContext() {
			var p, promises, pDeferred, i;

			scopeDestroyed.resolve();

			// TODO: Clear out the context prototypes?

			promises = [];
			for (i = 0; (p = proxied[i++]);) {
				pDeferred = defer();
				promises.push(pDeferred);
				processListeners(pDeferred, 'destroy', p);
			}

			// *After* listeners are processed,
			whenAll(promises, function () {
				function deleteAll(container) {
					for(var p in container) delete container[p];
				}

				deleteAll(local);
				deleteAll(objects);
				deleteAll(scope);

				var p, i;

				for (i = 0; (p = proxied[i++]);) {
					p.destroy();
				}

				// Free Objects
				local = objects = scope = proxied = proxies = parent
						= resolvers = factories = facets
						= wireApi = undef;

				// Free Arrays
				listeners = undef;
			});

			return scopeDestroyed;
		}

		//
		// Context API
		//

		// API of a wired context that is returned, via promise, to
		// the caller.  It will also have properties for all the
		// objects that were created in this scope.

		/**
		 * Resolves a reference in the current context, using any reference resolvers
		 * available in the current context
		 *
		 * @param ref {String} reference name (may contain resolver prefix, e.g. "resolver!refname"
		 */
		function apiResolveRef(ref) {
			return when(doResolveRef(ref));
		}

		/**
		 * Destroys the current context
		 */
		function apiDestroy() {
			return destroy();
		}

		/**
		 * Wires a child spec with this context as its parent
		 * @param spec
		 */
		function wireChild(spec) {
			return wireContext(spec, scopeParent);
		}

		//
		// Scope functions
		//

		function createPath(name, basePath) {
			var path = basePath || scope.path;

			return (path && name) ? (path + '.' + name) : name;
		}

		function createScopeItem(name, val, itemPromise) {
			// NOTE: Order is important here.
			// The object & local property assignment MUST happen before
			// the chain resolves so that the concrete item is in place.
			// Otherwise, the whole scope can be marked as resolved before
			// the final item has been resolved.
			var p = createItem(val, name);

			return when(p, function (resolved) {
				resolved = getResolvedValue(resolved);
				objects[name] = local[name] = resolved;
				itemPromise.resolve(resolved);
			}, chainReject(itemPromise));
		}

		function createItem(val, name) {
			var created;

			if (isRef(val)) {
				// Reference
				created = resolveRef(val, name);

			} else if (isArray(val)) {
				// Array
				created = createArray(val, name);

			} else if (isStrictlyObject(val)) {
				// Module or nested scope
				created = createModule(val, name);

			} else {
				// Plain value
				created = val;
			}

			return created;
		}

		function getModule(moduleId, spec) {
			var module, loadPromise;

			if (isString(moduleId)) {
				var m = moduleLoadPromises[moduleId];

				if (!m) {
					modulesToLoad.push(moduleId);
					m = moduleLoadPromises[moduleId] = {
						id: moduleId,
						deferred: defer()
					};

					moduleLoadPromises[moduleId] = m;
					loadPromise = when(loadModule(moduleId), function (module) {
						scanPlugin(module, spec);
						chain(modulesReady, m.deferred, module);
					});

					modulesToLoad.push(loadPromise);
				}

				module = m.deferred;

			} else {
				module = moduleId;
				scanPlugin(module);
			}

			return module;
		}

		function scanPlugin(module, spec) {
			if (module && isFunction(module.wire$plugin)) {
				var plugin = module.wire$plugin(contextPromise, scopeDestroyed.promise, spec);
				if (plugin) {
					addPlugin(plugin.resolvers, resolvers);
					addPlugin(plugin.factories, factories);
					addPlugin(plugin.facets, facets);

					listeners.push(plugin);

					addProxies(plugin.proxies);
				}
			}
		}

		function addProxies(proxiesToAdd) {
			if (!proxiesToAdd) return;

			var newProxies, p, i = 0;

			newProxies = [];
			while (p = proxiesToAdd[i++]) {
				if (indexOf(proxies, p) < 0) {
					newProxies.push(p)
				}
			}

			scope.proxies = proxies = newProxies.concat(proxies);
		}

		function addPlugin(src, registry) {
			for (var name in src) {
				if (registry.hasOwnProperty(name)) {
					throw new Error("Two plugins for same type in scope: " + name);
				}

				registry[name] = src[name];
			}
		}

		function createArray(arrayDef, name) {
			// Minor optimization, if it's an empty array spec, just return
			// an empty array.
			return arrayDef.length
					? when.map(arrayDef, function(item) {
						return createItem(item, name + '[]');
					})
					: [];
		}

		function createModule(spec, name) {

			// Look for a factory, then use it to create the object
			return when(findFactory(spec),
					function (factory) {
						var factoryPromise = defer();

						if (!spec.id) spec.id = name;

						factory(factoryPromise.resolver, spec, pluginApi);

						return processObject(factoryPromise, spec);
					},
					function () {
						// No factory found, treat object spec as a nested scope
						return createScope(spec, scope, name);
					}
			);
		}

		function findFactory(spec) {

			// FIXME: Should not have to wait for all modules to load,
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
				return getFactory() || rejected(spec);
			});
		}

		/**
		 * When the target component has been created, create its proxy,
		 * then push it through all its lifecycle stages.
		 *
		 * @private
		 *
		 * @param target the component being created, may be a promise
		 * @param spec the component's spec (the portion of the overall spec used to
		 *  create the target component)
		 *
		 * @returns {Promise} a promise for the fully wired component
		 */
		function processObject(target, spec) {

			return when(target,
				function (object) {

					var proxy = createProxy(object, spec);
					proxied.push(proxy);

					// Push the object through the lifecycle steps, processing
					// facets at each step.
					return when.reduce(lifecycleSteps,
							function (object, step) {
								return processFacets(step, proxy);
							}, proxy);
				}
			);
		}

		function createProxy(object, spec) {
			var proxier, proxy, id, i;

			i = 0;
			id = spec.id;

			while ((proxier = proxies[i++]) && !(proxy = proxier(object, spec))) {}

			proxy.target = object;
			proxy.spec = spec;
			proxy.id = id;
			proxy.path = createPath(id);

			return proxy;
		}

		function processFacets(step, proxy) {
			var promises, options, name, spec;
			promises = [];
			spec = proxy.spec;

			for (name in facets) {
				options = spec[name];
				if (options) {
					processStep(promises, facets[name], step, proxy, options);
				}
			}

			var d = defer();

			whenAll(promises,
				function () { processListeners(d, step, proxy); },
				chainReject(d)
			);

			return d;
		}

		function processListeners(promise, step, proxy) {
			var listenerPromises = [];
			for (var i = 0; i < listeners.length; i++) {
				processStep(listenerPromises, listeners[i], step, proxy);
			}

			// FIXME: Use only proxy here, caller should resolve target
			return chain(whenAll(listenerPromises), promise, proxy.target);
		}

		function processStep(promises, processor, step, proxy, options) {
			var facet, facetPromise;

			if (processor && processor[step]) {
				facetPromise = defer();
				promises.push(facetPromise);

				facet = delegate(proxy);
				facet.options = options;
				processor[step](facetPromise.resolver, facet, pluginApi);
			}
		}

		//
		// Built-in Factories
		//

		/**
		 * Factory that loads an AMD module
		 *
		 * @param resolver {Resolver} resolver to resolve with the created component
		 * @param spec {Object} portion of the spec for the component to be created
		 */
		function moduleFactory(resolver, spec /*, wire */) {
			chain(getModule(spec.module, spec), resolver);
		}

		/**
		 * Factory that uses an AMD module either directly, or as a
		 * constructor or plain function to create the resulting item.
		 *
		 * @param resolver {Resolver} resolver to resolve with the created component
		 * @param spec {Object} portion of the spec for the component to be created
		 */
		function instanceFactory(resolver, spec /*, wire */) {
			var fail, create, module, args, isConstructor, name;

			fail = chainReject(resolver);
			name = spec.id;

			create = spec.create;
			if (isStrictlyObject(create)) {
				module = create.module;
				args = create.args;
				isConstructor = create.isConstructor;
			} else {
				module = create;
			}

			// Load the module, and use it to create the object
			function handleModule(module) {
				function resolve(resolvedArgs) {
					try {
						var instantiated = instantiate(module, resolvedArgs, isConstructor);
						resolver.resolve(instantiated);
					} catch (e) {
						resolver.reject(e);
					}
				}

				try {
					// We'll either use the module directly, or we need
					// to instantiate/invoke it.
					if (isFunction(module)) {
						// Instantiate or invoke it and use the result
						if (args) {
							args = isArray(args) ? args : [args];
							when(createArray(args, name), resolve, fail);

						} else {
							// No args, don't need to process them, so can directly
							// insantiate the module and resolve
							resolve([]);

						}

					} else {
						// Simply use the module as is
						resolver.resolve(module);

					}
				} catch (e) {
					fail(e);
				}
			}

			when(getModule(module, spec), handleModule, fail);
		}
		
		/**
        * Factory that uses an AMD module either directly, or as a
        * constructor or plain function to create the resulting item.
		* In addition it also attempts to automatically resolve any items defined by
		* the creating function.
        *
        * @param resolver {Resolver} resolver to resolve with the created component
        * @param spec {Object} portion of the spec for the component to be created
        */
        function resolverFactory(resolver, spec /*, wire*/)
        {
            var fail, resolve, module, args, isConstructor, name;

            fail = chainReject(resolver);
            name = spec.id;

            resolve = spec.resolve;
            if (isStrictlyObject(resolve))
            {
                module = resolve.module;
                args = resolve.args;
                isConstructor = resolve.isConstructor;
            }
            else
            {
                module = resolve;
            }

            // Load the module, and use it to resolve the object
            function handleModule(module)
            {
                function resolve(resolvedArgs)
                {
                    try
                    {
                        var instantiated = instantiate(module, resolvedArgs, isConstructor);
                        resolver.resolve(instantiated);
                    } catch (e)
                    {
                        resolver.reject(e);
                    }
                }

                try
                {
                    // We'll either use the module directly, or we need
                    // to instantiate/invoke it.
                    if (isFunction(module))
                    {
                        // Run analyizer here
                        var analysis = resolverAnalyzer.analyzeFunction(module);
                        var params = analysis.parameters;

                        // Assumption here is that args array supplied to wire contains
                        //      enough to cover the null holes in the parameters.
                        if (args)
                        {
                            var argI = 0;
                            for (var i = 0, iLen = params.length; i < iLen; i++)
                            {
                                if (params[i] === null)
                                    params[i] = args[argI++];
                            }
                        }
                        args = params;

                        // Include resolver store here, and capture all the missing items from the spec and bring them in.

                        // Instantiate or invoke it and use the result
                        if (args)
                        {
                            args = isArray(args) ? args : [args];
                            when(createArray(args, name), resolve, fail);
                        }
                        else
                        {
                            // No args, don't need to process them, so can directly
                            // insantiate the module and resolve
                            resolve([]);

                        }

                    } else
                    {
                        // Simply use the module as is
                        resolver.resolve(module);

                    }
                } catch (e)
                {
                    fail(e);
                }
            }

            when(getModule(module, spec), handleModule, fail);
        }

		/**
		 * Factory that creates either a child context, or a *function* that will create
		 * that child context.  In the case that a child is created, this factory returns
		 * a promise that will resolve when the child has completed wiring.
		 *
		 * @param resolver {Resolver} resolver to resolve with the created component
		 * @param spec {Object} portion of the spec for the component to be created
		 */
		function wireFactory(resolver, spec/*, wire */) {
			var options, module, get, defer, waitParent;

			options = spec.wire;

			// Get child spec and options
			if (isString(options)) {
				module = options;
			} else {
				module = options.spec;
				waitParent = options.waitParent;
				defer  = options.defer;
				get    = options.get;
			}

			// Trying to use both get and defer is an error
			if(defer && get) {
				resolver.reject("you can't use defer and get at the same time");
				return;
			}

			function createChild(/** {Object|String}? */ mixin) {
				var spec = mixin ? [].concat(module, mixin) : module;
				return wireChild(spec);
			}

			if (defer) {
				// Resolve with the createChild *function* itself
				// which can be used later to wire the spec
				resolver.resolve(createChild);

			} else if (get) {
				// Wire a new scope, and get a named component from it to use
				// as the component currently being wired.
				when(loadModule(module), function(spec) {
					return when(createItem(spec, get), function(scope) {
						return doResolveRef(get, {}, scope);
					});
				}).then(resolver.resolve, resolver.reject);

			} else if(waitParent) {

				var childPromise = when(contextPromise, function() {
					return createChild();
				});

				resolver.resolve(new PromiseKeeper(childPromise));

			} else {
				resolver.resolve(createChild());

			}
		}

		//
		// Reference resolution
		//

		function resolveRef(ref, name) {
			var refName = ref.$ref;

			return doResolveRef(refName, ref, name == refName ? parent.objects : objects);
		}

		function doResolveRef(refName, refObj, scope) {
			var promise, deferred, split, resolverName;

			scope = scope || objects;

			if (refName in scope) {
				promise = scope[refName];

			} else {
				deferred = defer();
				split = refName.indexOf('!');

				if (split > 0) {
					resolverName = refName.substring(0, split);
					refName = refName.substring(split + 1);
					// Wait for modules, since the reference may need to be
					// resolved by a resolver plugin
					when(modulesReady, function () {

						var resolver = resolvers[resolverName];

						if (resolver) {
							resolver(deferred.resolver, refName, refObj||{}, pluginApi);
						} else {
							deferred.reject("No resolver found for ref: " + refName);
						}
					});

				} else {
					deferred.reject("Cannot resolve ref: " + refName);
				}

				promise = deferred.promise;
			}

			return promise;
		}

		/**
		 * Builtin reference resolver that resolves to the context-specific
		 * wire function.
		 *
		 * @param resolver {Resolver} resolver to resolve
		 */
		function wireResolver(resolver /*, name, refObj, wire*/) {
			resolver.resolve(wireApi);
		}

		//
		// Destroy
		//

		/**
		 * Destroy the current context.  Waits for the context to finish
		 * wiring and then immediately destroys it.
		 *
		 * @return {Promise} a promise that will resolve once the context
		 * has been destroyed
		 */
		function destroy() {
			return when(scopeReady, doDestroy, doDestroy);
		}

	}