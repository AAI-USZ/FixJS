function exponent_e() {
			if (c != 'e' && c != 'E') {
				throw new LexError("Invalid number literal.");
			}

			return states.EXPONENT_SIGN;
		}