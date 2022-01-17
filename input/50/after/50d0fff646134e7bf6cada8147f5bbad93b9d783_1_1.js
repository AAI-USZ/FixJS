function (name) {
		ASSERT(typeof name === "string");

		return name.slice(-COLLSUFFIX.length) !== COLLSUFFIX;
	}