function (first, second) {
		ASSERT(typeof first === "string" || typeof first === "number");
		ASSERT(typeof second === "string" || typeof second === "number");

		return second === EMPTY_STRING ? first : (first === EMPTY_STRING ? second : first + "/"
		+ second);
	}