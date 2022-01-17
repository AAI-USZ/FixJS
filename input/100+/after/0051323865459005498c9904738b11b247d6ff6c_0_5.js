function(obj, prop) {
		if (Object.keys in window) {
			Object.keys(prop).forEach(function(p) {
				if (prop.hasOwnProperty(p)) {
					Object.defineProperty(obj, p, {
						value: prop[p],
						writable: true,
						enumerable: false,
						configurable: true
					});
				}
			});
		} else {
			if (!prop) {
				prop = obj;
				obj = this;
			}
			for (var i in prop) {
				obj[i] = prop[i];
			}
			return obj;
		}
		return this;
	}