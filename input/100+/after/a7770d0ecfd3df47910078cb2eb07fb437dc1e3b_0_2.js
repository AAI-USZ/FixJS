function(value) {
		return $.isFunction(value) ? value() : value;
	}