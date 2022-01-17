function twTokenStrike(stream, state) {
		var maybeEnd = false,
			ch, nr;
			
		while (ch = stream.next()) {
			if (ch == "-" && maybeEnd) {
				state.tokenize = jsTokenBase;
				break;
			}
			maybeEnd = (ch == "-");
		}
		return ret("text", "strikethrough");
	}