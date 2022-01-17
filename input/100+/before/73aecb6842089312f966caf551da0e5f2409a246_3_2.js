function() {
		this.reader.mark();

		var firstChar = this.reader.readNextChar();
		var numChars  = 1;

		if (isLineTerm(firstChar)) {
			if (firstChar == "") {
				return this.__makeToken__(hjs.TokenType.LINE_TERM, "");
			} else {
				var nextChar = firstChar;
				var tok = nextChar;
				
				while (nextChar != "" && isLineTerm(nextChar = this.reader.readNextChar())) {
					numChars++;
					tok += nextChar;
				}

				return this.__makeToken__(hjs.TokenType.LINE_TERM, tok);
			}
		}

		// String literal
		else if (firstChar == "\"") {
			return this.__readString__(firstChar);
		}

		// Numeric literal
		else if (isNumberStart(firstChar)) {
			var nextChar;

			// Maybe a hex literal?
			if (firstChar == '0') {
				var nextChar = this.reader.readNextChar();

				if (nextChar == 'x') {
					return this.__readHexLiteral("0x");
				}
			}

			while (isNumberPart(this.reader.readNextChar())) {
				++numChars;
			}

			this.reader.reset();

			var tok = "";
			for (var i = 0; i < numChars; ++i) {
				tok.push(this.reader.readNextChar());
			}

			return this.__makeToken__(hjs.TokenType.NUMBER, tok);
		}

		// Identifier
		else if (isIdStart(firstChar)) {
			while (isIdPart(this.reader.readNextChar())) {
				++numChars;
			}

			this.reader.reset();

			var tok = "";
			for (var i = 0; i < numChars; ++i) {
				tok.push(this.reader.readNextChar());
			}

			return this.__makeToken__(hjs.TokenType.ID, tok);
		}

		// Comment
		else if (firstChar == "#" || firstChar == "\u2014" || firstChar == "\u2015") {
			while (!isLineTerm(this.reader.readNextChar())) ++numChars;
			var tok = "";
			this.reader.reset();
			for (var i = 0; i < numChars; ++i) {
				tok.push(this.reader.readNextChar());
			}

			return this.__makeToken__(hjs.TokenType.COMMENT, tok);
		}

		// Two-character comment initiator
		else if (firstChar == "-" || firstChar == "/") {
			var secondChar = this.reader.readNextChar();
			++numChars;

			if (firstChar == secondChar) {
				while (!isLineTerm(this.reader.readNextChar())) ++numChars;
				var tok = "";
				this.reader.reset();
				for (var i = 0; i < numChars; ++i) {
					tok.push(this.reader.readNextChar());
				}

				return this.__makeToken__(hjs.TokenType.COMMENT, tok);
			} else {
				this.reader.reset();
				this.reader.readNextChar();
				return this.__makeToken__(hjs.TokenType.SYMBOL, firstChar);
			}
		}

		// Begin-end delimited comment
		else if (firstChar == "\u221E" || firstChar == "~") {
			var secondChar = this.reader.readNextChar(); ++numChars;

			if (firstChar == secondChar) {
				var nextToLastChar = firstChar;
				var lastChar = secondChar;

				while (nextToLastChar == firstChar && lastChar == firstChar) {
					nextToLastChar = lastChar;
					lastChar = this.reader.readNextChar();
					++numChars;
				}

				while ((nextToLastChar != "" && nextToLastChar != firstChar) || (lastChar != "" && lastChar != firstChar)) {
					nextToLastChar = lastChar;
					lastChar = this.reader.readNextChar();
					++numChars;
				} 

				while (this.reader.readNextChar() == firstChar) ++numChars;

				var tok = "";
				this.reader.reset();
				for (var i = 0; i < numChars; ++i) {
					tok.push(this.reader.readNextChar());
				}

				return this.__makeToken__(hjs.TokenType.COMMENT, tok);
			} else {
				this.reader.reset();
				this.reader.readNextChar();
				return this.__makeToken__(hjs.TokenType.SYMBOL, firstChar);
			}
		}

		// Line continuation
		else if (firstChar == "\u00AC" || firstChar == "\\") {
			while (true) {
				var nextChar = this.reader.readNextChar();
				++numChars;

				if (isLineTerm(nextChar)) {
					while (nextChar != "" && isLineTerm(nextChar = this.reader.readNextChar())) {
						++numChars;
					}

					var tok = "";
					this.reader.reset();
					for (var i = 0; i < numChars; ++i) {
						tok.push(this.reader.readNextChar());
					}

					return this.__makeToken__(hjs.TokenType.CONTINUATOR, tok);
				} else if (!isWhitespace(nextChar)) {
					this.reader.reset();
					this.reader.readNextChar();

					return this.__makeToken__(hjs.TokenType.SYMBOL, firstChar);
				}
			}
		}

		// Whitespace
		else if (isWhitespace(firstChar)) {
			return this.__makeToken__(hjs.TokenType.WHITESPACE, firstChar);
		}

		// Symbol token
		else {
			return this.__makeToken__(hjs.TokenType.SYMBOL, firstChar);
		}
	}