function exponent_sign() {
			if (c == '+' || c == '-' || DIGIT_PATTERN.test(c)) {
				return states.EXPONENT;
			}

			throw new LexError("Invalid number literal.");
		}