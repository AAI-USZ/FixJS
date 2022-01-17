function(value) {
		if (value !== undefined) return value.constructor == String;
		else return false;
	}