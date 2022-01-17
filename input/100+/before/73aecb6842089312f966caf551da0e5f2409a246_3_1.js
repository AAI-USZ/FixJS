function isIdPart(c) {
		return c == "."
			|| c == "'"
			|| isIdStart(c)
			|| DIGIT_PATTERN.test(c);
	}