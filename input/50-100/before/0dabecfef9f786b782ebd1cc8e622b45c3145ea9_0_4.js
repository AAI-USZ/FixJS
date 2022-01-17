function handleModule(module) {
			function resolve(resolvedArgs) {
				return createComponent(module, resolvedArgs, isConstructor);
			}

			// We'll either use the module directly, or we need
			// to instantiate/invoke it.
			if (typeof module == 'function') {
				// Instantiate or invoke it and use the result
				return args
					? when(wire(asArray(args), name), resolve)
					: resolve([]);

			} else {
				// Simply use the module as is
				return Object.create(module);
			}
		}