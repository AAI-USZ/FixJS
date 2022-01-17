function() {
			var source = "idOfMe";
			var lexer = new Hyper.Lexer(source);
			var token = lexer.getToken();

			expect(token).not.toBeNull();
			expect(token.type).toEqual(Hyper.TokenType.ID);
			expect(token.text).toEqual("idOfMe");
			expect(token.source).toEqual(source);
		}