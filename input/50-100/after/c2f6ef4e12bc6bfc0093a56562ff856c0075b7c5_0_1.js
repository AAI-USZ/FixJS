function() {
				lexer.__assembleToken__();

				expect(lexer.__assembleToken__().type).toEqual(Hyper.TokenType.SYMBOL);
			}