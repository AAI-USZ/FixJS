function(firstChar) {
		var numChars = 1;

		while (!isLineTerm(this.reader.readNextChar())) {
			++numChars;
		}

		this.reader.reset();

		return this.__makeToken__(hjs.TokenType.COMMENT, this.reader.read(numChars));
	}