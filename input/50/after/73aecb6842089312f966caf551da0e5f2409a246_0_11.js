function() {
				var tok = lexer.__readNumber__(text[0]);
				expect(tok.text).toEqual(text);
			}