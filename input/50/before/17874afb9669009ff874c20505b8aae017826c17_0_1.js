function(obj, defaults) {
			for (var prop in defaults) {
				if (obj[prop] === null)
					obj[prop] = defaults[prop];
			}
			return obj;
		}