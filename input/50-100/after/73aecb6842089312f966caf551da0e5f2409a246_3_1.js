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

			if (lastSign) {
				return states.NAN;
			}

			lastSign = false;

			return states.COMPLETE;
		}