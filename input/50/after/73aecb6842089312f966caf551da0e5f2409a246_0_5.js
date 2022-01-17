function() {
				expect(lexer.__readNumber__(text[0]).type).toEqual(Hyper.TokenType.NUMBER);
			}