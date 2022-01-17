function () {
		if (arguments.length !== 1 || !Array.isArray(arguments[0])) {
			throw 'last requires one list as an argument';
		}
		return arguments[0][arguments.length - 1];
	}