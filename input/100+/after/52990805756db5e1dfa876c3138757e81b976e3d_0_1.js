function(property) {

		property = property.camelCase();

		if (property in this.style)
			return property;

		if (cache[property] !== undefined)
			return cache[property];

		var suffix = property.charAt(0).toUpperCase() + property.slice(1);

		for (var i = 0; i < prefixes.length; i++) {
			var prefixed = prefixes[i] + suffix;
			if (prefixed in this.style) {
				cache[property] = prefixed;
				break
			}
		}

		if (cache[property] === undefined)
			cache[property] = property;

		return cache[property];
	}