function addToStore(self, store, name, item, process) {
		// Add item to named store such as templates, helpers, converters...
		var key, onStore;
		if (name && typeof name === "object" && !name.nodeType) {
			// If name is a map, iterate over map and call store for key
			for (key in name) {
				store(key, name[key]);
			}
			return self;
		}
		if (!name || item === undefined) {
			if (process) {
				item = process(undefined, item || name);
			}
		} else if ("" + name === name) { // name must be a string
			if (item === null) {
				// If item is null, delete this entry
				delete store[name];
			} else if (item = process ? process(name, item) : item) {
				store[name] = item;
			}
		}
		if (onStore = sub.onStoreItem) {
			// e.g. JsViews integration
			onStore(store, name, item, process);
		}
		return item;
	}