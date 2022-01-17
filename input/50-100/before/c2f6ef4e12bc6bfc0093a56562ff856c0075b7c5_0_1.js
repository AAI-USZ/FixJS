function() {
				var tok = lexer.__assembleToken__();

				expect(tok.type).toEqual(Hyper.TokenType.NUMBER);
				expect(tok.specialToken).toBeDefined();
				expect(tok.specialToken.type).toEqual(Hyper.TokenType.WHITESPACE);
				expect(tok.specialToken.specialToken).toBeDefined();
				expect(tok.specialToken.specialToken.type).toEqual(Hyper.TokenType.COMMENT);
			}