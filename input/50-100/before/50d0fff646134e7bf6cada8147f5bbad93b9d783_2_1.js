function (first, second) {
		ASSERT(typeof first === "string");
		ASSERT(typeof second === "string");

		return second === EMPTY_STRING ? first : (first === EMPTY_STRING ? second : first + "/"
		+ second);
	}