function integral() {
			if (DIGIT_PATTERN.test(c)) {
				return states.INTEGRAL;
			}

			if (c == '.') {
				return states.FRACTIONAL;
			}

			if (c == 'e' || c == 'E') {
				return states.EXPONENT_SIGN;
			}

			return states.COMPLETE;
		}