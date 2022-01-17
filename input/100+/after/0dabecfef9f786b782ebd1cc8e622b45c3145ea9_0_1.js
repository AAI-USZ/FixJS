function instanceFactory(resolver, spec, wire) {
		var create, args, isConstructor, name, promise;

		name = spec.id;
		create = spec.create;

		if (typeof create == 'string') {
			promise = wire.loadModule(create, spec);
		} else if(wire.resolver.isRef(create)) {
			promise = wire(create);
		} else {
			promise = wire(create);
			args = create.args;
			isConstructor = create.isConstructor;
		}

		chain(when(promise, handleModule), resolver);

		// Load the module, and use it to create the object
		function handleModule(module) {
			function resolve(resolvedArgs) {
				return createComponent(module, resolvedArgs, isConstructor);
			}

			// We'll either use the module directly, or we need
			// to instantiate/invoke it.
			if (typeof module == 'function') {
				// Instantiate or invoke it and use the result
				return args
					? when(wire(asArray(args)), resolve)
					: resolve([]);

			} else {
				// Simply use the module as is
				return Object.create(module);
			}
		}
	}