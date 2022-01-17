function() {
					expect(lexer.__nextToken__().type).toEqual(hjs.TokenType.ID);
					expect(lexer.__nextToken__().type).toEqual(hjs.TokenType.LINE_TERM);
				}