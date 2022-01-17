function(properties, key) {
			return wire(properties[key], facet.path).then(
				function(wiredProperty) {
					facet.set(key, wiredProperty);
					return properties;
				}
			);
		}