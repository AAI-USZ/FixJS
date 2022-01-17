function() {
				expect(lexer.__readNumber__("1").type).toEqual(hjs.TokenType.NUMBER);
			}