function (first, second) {
		ASSERT(typeof first === "string" && typeof second === "string");

		return second === EMPTY_STRING ? first : (first === EMPTY_STRING ? second : first + "/"
		+ second);
	}