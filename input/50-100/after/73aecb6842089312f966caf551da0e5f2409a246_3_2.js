function(firstChar) {
		var numChars = 1;

		while (isIdPart(this.reader.readNextChar())) {
			++numChars;
		}

		this.reader.reset();

		return this.__makeToken__(hjs.TokenType.ID, this.reader.read(numChars));
	}