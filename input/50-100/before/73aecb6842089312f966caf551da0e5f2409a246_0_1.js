function() {
			var source = "idOfMe";
			var lexer = new hjs.Lexer(source);
			var token = lexer.nextToken();

			expect(token).not.toBeNull();
			expect(token.type()).toEqual(hjs.TokenType.ID);
			expect(token.text()).toEqual("idOfMe");
			expect(token.source()).toEqual(source);
		}