function (token, tokens, bucket) {
	// Needs to match property + S* + COLON
	if (! bucket.property.canStartWith(token, tokens, bucket)) {
		return false;
	}

	var offset = 1;

	if (token.type == 'CHAR' && token.content == '*') {
		// Properties might be two tokens instead of one
		offset ++;
	}

	var t = tokens.getToken(offset);

	if (t && t.type == 'S') {
		offset ++;
		t = tokens.getToken(offset);
	}

	if (t && t.type == 'COLON') {
		return true;
	}

	return false;
}