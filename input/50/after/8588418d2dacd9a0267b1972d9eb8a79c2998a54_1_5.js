function extendStore(storeName) {
			if (parent[storeName]) {
				// Include parent items except if overridden by item of same name in options
				tmpl[storeName] = $extend($extend({}, parent[storeName]), options[storeName]);
			}
		}