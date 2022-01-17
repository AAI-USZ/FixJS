function() {
			beforeEach(function() {
				text = "¬\n";
				lexer = new Hyper.Lexer(text);
			});

			it("yields a token of type CONTINUATOR", function() {
				console.log("testing...")
				expect(lexer.__nextToken__().type).toEqual(Hyper.TokenType.CONTINUATOR);
			})
		}