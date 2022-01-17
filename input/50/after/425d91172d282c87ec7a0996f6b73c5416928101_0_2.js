function () {
		if (arguments.length !== 1 || !Array.isArray(arguments[0])) {
			throw 'head requires one list as an argument';
		}
		return arguments[0].slice(0, arguments[0].length - 1);
	}