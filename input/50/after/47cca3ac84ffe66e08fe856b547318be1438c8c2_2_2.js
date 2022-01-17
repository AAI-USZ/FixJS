function(token) {
		this.DOMStringCollection_check_currentValue_and_Token(token);

		return _String_contains.call(" " + this.value + " ", " " + token + " ");
	}