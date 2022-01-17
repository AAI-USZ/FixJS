function isLineTerm(c) {
		return c == NULL_CHAR
			|| LINE_TERM_PATTERN.test(c);
	}