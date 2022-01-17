function() {
			var text = "123";

			beforeEach(function() {
				lexer = new hjs.Lexer(text);
				lexer.reader.mark();
				lexer.reader.readNextChar();
			});

			it("yields a token of type Number", function() {
				expect(lexer.__readNumber__("1").type).toEqual(hjs.TokenType.NUMBER);
			});

			it ("yields a token with the text '123'", function() {
				expect(lexer.__readNumber__("1").text).toEqual(text);
			});
		}