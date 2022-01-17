function extendObject(destination, source) {
		for (var key in source) {
			if (source.hasOwnProperty(key) && source[key]) {
				if (key && destination[key] && !(exports.getType(destination[key]) === "array")) {
					extendObject(destination[key], source[key]);
				} else {
					destination[key] = source[key];
				}
			}
		}
	}