function twTokenCode(stream, state) {
		var ch, sb = state.block;
		
		if (sb && stream.current()) {
			return ret("code", "comment");
		}

		if (!sb && stream.match(reUntilCodeStop)) {
			state.tokenize = jsTokenBase;
			return ret("code", "comment");
		}

		if (sb && stream.sol() && stream.match(reCodeBlockStop)) {
			state.tokenize = jsTokenBase;
			return ret("code", "comment");
		}

		ch = stream.next();
		return (sb) ? ret("code", "comment") : ret("code", "comment");
	}