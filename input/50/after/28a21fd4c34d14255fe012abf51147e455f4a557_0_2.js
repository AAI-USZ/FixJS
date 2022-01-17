function (type) { // (String) -> Boolean
		return (key in this) && (type in this[key]) && (this[key][type].length > 0);
	}