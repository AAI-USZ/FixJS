function( obj ) {
		if (typeof obj === "undefined") {
				return "undefined";

		// consider: typeof null === object
		}
		if (obj === null) {
				return "null";
		}

		var type = toString.call( obj ).match(/^\[object\s(.*)\]$/)[1] || '';

		switch (type) {
			case 'Number':
				if (isNaN(obj)) {
					return "nan";
				}
				return "number";
			case 'String':
			case 'Boolean':
			case 'Array':
			case 'Date':
			case 'RegExp':
			case 'Function':
					return type.toLowerCase();
		}
		if (typeof obj === "object") {
				return "object";
		}
		return undefined;
	}