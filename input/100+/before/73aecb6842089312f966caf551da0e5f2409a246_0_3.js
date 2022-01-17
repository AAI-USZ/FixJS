function() {
		describe("when given the string 'asdf'", function() {
			var text = "asdf";
			var lexer;

			beforeEach(function() {
				lexer = new hjs.Lexer(text);
			});

			it("yields a token of type ID", function() {
				expect(lexer.__nextToken__().type).toEqual(hjs.TokenType.ID);
			});

			it("yields a token containing the text 'asdf'", function() {
				expect(lexer.__nextToken__().text).toEqual("asdf");
			});

			describe("and when called twice", function() {
				it("yields an ID token and a LINE_TERM token", function() {
					expect(lexer.__nextToken__().type).toEqual(hjs.TokenType.ID);
					expect(lexer.__nextToken__().type).toEqual(hjs.TokenType.LINE_TERM);
				});

				it("yields a second token with an empty string for text", function() {
					lexer.__nextToken__();
					expect(lexer.__nextToken__().text).toEqual("");
				});
			});
		});

		describe("when given the string '1.23'", function() {
			it("yields a token of type NUMBER", function() {

			});

			it("yields a token containing the text '1.23'.", function() {

			});
		});

		describe("when given the string '.08", function() {

		});
	}