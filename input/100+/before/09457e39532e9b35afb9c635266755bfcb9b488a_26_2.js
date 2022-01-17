function twTokenCode(stream, state) {
		var ch, sb = state.block;
		
		if (sb && stream.current()) {
			return ret("code", "code");
		}

		if (!sb && stream.match(reUntilCodeStop)) {
			state.tokenize = jsTokenBase;
			return ret("code", "code-inline");
		}

		if (sb && stream.sol() && stream.match(reCodeBlockStop)) {
			state.tokenize = jsTokenBase;
			return ret("code", "code");
		}

		ch = stream.next();
		return (sb) ? ret("code", "code") : ret("code", "code-inline");
	}