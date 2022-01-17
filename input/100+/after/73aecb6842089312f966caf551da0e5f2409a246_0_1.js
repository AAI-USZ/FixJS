function() {
		var lexer;
		var text;

		it("expects the first char to be given as an argument", function() {
			lexer = new Hyper.Lexer("123");
			lexer.reader.readNextChar();
			expect(lexer.__readNumber__("1").text).toEqual("123");
		});

		describe("when given the string '123'", function() {
			beforeEach(function() {
				text = "123";
				lexer = new Hyper.Lexer(text);
				lexer.reader.readNextChar();
			});

			it("yields a token of type Number", function() {
				expect(lexer.__readNumber__(text[0]).type).toEqual(Hyper.TokenType.NUMBER);
			});

			it ("yields a token with the text '" + text + "'", function() {
				var tok = lexer.__readNumber__(text[0]);
				expect(tok.text).toEqual(text);
			});
		});
		
		describe("when given the string '0'", function() {
			beforeEach(function() {
				text = "0";
				lexer = new Hyper.Lexer(text);
				lexer.reader.readNextChar();
			});

			it("yields a token of type Number", function() {
				expect(lexer.__readNumber__(text[0]).type).toEqual(Hyper.TokenType.NUMBER);
			});

			it ("yields a token with the text '" + text + "'", function() {
				var tok = lexer.__readNumber__(text[0]);
				expect(tok.text).toEqual(text);
			});
		});
		
		describe("when given the string '0.1'", function() {
			beforeEach(function() {
				text = "0.1";
				lexer = new Hyper.Lexer(text);
				lexer.reader.readNextChar();
			});

			it("yields a token of type Number", function() {
				expect(lexer.__readNumber__(text[0]).type).toEqual(Hyper.TokenType.NUMBER);
			});

			it ("yields a token with the text '" + text + "'", function() {
				var tok = lexer.__readNumber__(text[0]);
				expect(tok.text).toEqual(text);
			});
		});
		
		describe("when given the string '.1'", function() {
			beforeEach(function() {
				text = ".1";
				lexer = new Hyper.Lexer(text);
				lexer.reader.readNextChar();
			});

			it("yields a token of type Number", function() {
				expect(lexer.__readNumber__(text[0]).type).toEqual(Hyper.TokenType.NUMBER);
			});

			it ("yields a token with the text '" + text + "'", function() {
				var tok = lexer.__readNumber__(text[0]);
				expect(tok.text).toEqual(text);
			});
		});
		
		describe("when given the string '-.1'", function() {
			beforeEach(function() {
				text = "-.1";
				lexer = new Hyper.Lexer(text);
				lexer.reader.readNextChar();
			});

			it("yields a token of type Number", function() {
				expect(lexer.__readNumber__(text[0]).type).toEqual(Hyper.TokenType.NUMBER);
			});

			it ("yields a token with the text '" + text + "'", function() {
				var tok = lexer.__readNumber__(text[0]);
				expect(tok.text).toEqual(text);
			});
		});
		
		describe("when given the string '1e10'", function() {
			beforeEach(function() {
				text = "1e10";
				lexer = new Hyper.Lexer(text);
				lexer.reader.readNextChar();
			});

			it("yields a token of type Number", function() {
				expect(lexer.__readNumber__(text[0]).type).toEqual(Hyper.TokenType.NUMBER);
			});

			it ("yields a token with the text '" + text + "'", function() {
				var tok = lexer.__readNumber__(text[0]);
				expect(tok.text).toEqual(text);
			});
		});
		
		describe("when given the string '1e-2'", function() {
			beforeEach(function() {
				text = "1e-2";
				lexer = new Hyper.Lexer(text);
				lexer.reader.readNextChar();
			});

			it("yields a token of type Number", function() {
				expect(lexer.__readNumber__(text[0]).type).toEqual(Hyper.TokenType.NUMBER);
			});

			it ("yields a token with the text '" + text + "'", function() {
				var tok = lexer.__readNumber__(text[0]);
				expect(tok.text).toEqual(text);
			});
		});
		
		describe("when given the string '-.1e10'", function() {
			beforeEach(function() {
				text = "-.1e10";
				lexer = new Hyper.Lexer(text);
				lexer.reader.readNextChar();
			});

			it("yields a token of type Number", function() {
				expect(lexer.__readNumber__(text[0]).type).toEqual(Hyper.TokenType.NUMBER);
			});

			it ("yields a token with the text '" + text + "'", function() {
				var tok = lexer.__readNumber__(text[0]);
				expect(tok.text).toEqual(text);
			});
		});
		
		describe("when given the string '0.1e10'", function() {
			beforeEach(function() {
				text = "0.1e10";
				lexer = new Hyper.Lexer(text);
				lexer.reader.readNextChar();
			});

			it("yields a token of type Number", function() {
				expect(lexer.__readNumber__(text[0]).type).toEqual(Hyper.TokenType.NUMBER);
			});

			it ("yields a token with the text '" + text + "'", function() {
				var tok = lexer.__readNumber__(text[0]);
				expect(tok.text).toEqual(text);
			});
		});
		
		describe("when given the string '1.1e10'", function() {
			beforeEach(function() {
				text = "1.1e10";
				lexer = new Hyper.Lexer(text);
				lexer.reader.readNextChar();
			});

			it("yields a token of type Number", function() {
				expect(lexer.__readNumber__(text[0]).type).toEqual(Hyper.TokenType.NUMBER);
			});

			it ("yields a token with the text '" + text + "'", function() {
				var tok = lexer.__readNumber__(text[0]);
				expect(tok.text).toEqual(text);
			});
		});
	}