function(token) {
		DOMStringCollection_checkToken(token);

		return _String_contains.call(" " + this.value + " ", " " + token + " ");
	}