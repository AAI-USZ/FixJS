function onCursorHover(cursor, cmLinesNode, cm) {
		var token = cursor ? cm.getTokenAt(cursor) : null;

		// Tokens don't include line information
		if (token) { token.line = cursor.line; }

		// Same token hovered as before: abort
		if (hover.token &&
			token &&
			token.string    === hover.token.string &&
			token.className === hover.token.className &&
			token.start     === hover.token.start &&
			token.end       === hover.token.end &&
			token.line      === hover.token.line
		) { return; }

		hover.token = token;
		onTokenHover(token, cursor, cmLinesNode, cm);
	}