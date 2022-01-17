function(input){
	var tok = new Tokenizer(input);
	var stack = [];
	try {
		var parser = new ZeParser(input, tok, stack);
		parser.parse();
		return parser;
	} catch (e) {
		console.log("Parser has a bug for this input, please report it :)", e);
		return null;
	}
}