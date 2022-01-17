function (token, tokens, bucket) {
	if (token.type == 'IDENT') {
		return true;
	}

	if (token.type == 'CHAR' && token.content == '*' && tokens.getToken(1).type == 'IDENT') {
		return true;
	}

	return false;
}