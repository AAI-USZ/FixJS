function syntaxError(message, e) {
		throw (e ? (e.name + ': "' + e.message + '"') : "Syntax error") + (message ? (" \n" + message) : "");
	}