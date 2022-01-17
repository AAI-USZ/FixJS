function createItem(val, name) {
			var created;

			if (resolver.isRef(val)) {
				// Reference
				created = resolveRef(val, name);

			} else if (Array.isArray(val)) {
				// Array
				created = createArray(val, name);

			} else if (object.isObject(val)) {
				// Module or nested scope
				created = createModule(val, name);

			} else {
				// Plain value
				created = val;
			}

			return created;
		}