function Tokenizer(inp, options){
	this.inp = inp||'';
	// replace all other line terminators with \n (leave \r\n in tact though). we should probably remove the shadowInp when finished...
	// only replace \r if it is not followed by a \n else \r\n would become \n\n causing a double newline where it is just a single
	this.shadowInp = (inp||'').replace(Tokenizer.regexNormalizeNewlines, '\n');
	this.pos = 0;
	this.line = 0;
	this.column = 0;
	this.cache = {};

	this.errorStack = [];

	this.wtree = [];
	this.btree = [];

//	this.regexWhiteSpace = Tokenizer.regexWhiteSpace;
	this.regexLineTerminator = Tokenizer.regexLineTerminator; // used in fallback
	this.regexAsciiIdentifier = Tokenizer.regexAsciiIdentifier;
	this.hashAsciiIdentifier = Tokenizer.hashAsciiIdentifier;
//	this.regexHex = Tokenizer.regexHex;
	this.hashHex = Tokenizer.hashHex
	this.regexUnicodeEscape = Tokenizer.regexUnicodeEscape;
	this.regexIdentifierStop = Tokenizer.regexIdentifierStop;
	this.hashIdentifierStop = Tokenizer.hashIdentifierStop;
//	this.regexPunctuators = Tokenizer.regexPunctuators;
	this.regexNumber = Tokenizer.regexNumber;
	this.regexNewline = Tokenizer.regexNewline;

	this.regexBig = Tokenizer.regexBig;
	this.regexBigAlt = Tokenizer.regexBigAlt;

  // stuff for parsing tag literals
  this.regexTagName = Tokenizer.regexTagName;
  this.regexTagAttributes = Tokenizer.regexTagAttributes;
  this.regexTagUnarySuffix = Tokenizer.regexTagUnarySuffix;
  this.regexTagBinarySuffix = Tokenizer.regexTagBinarySuffix;
  this.regexTagBody = Tokenizer.regexTagBody;
  this.regexTagOpenOrClose = Tokenizer.regexTagOpenOrClose;
  this.regexTagClose = Tokenizer.regexTagClose;
	this.regexRemoveEscape = Tokenizer.regexRemoveEscape;

	this.tokenCount = 0;
	this.tokenCountNoWhite = 0;

	this.Unicode = window.Unicode;

	// if the Parser throws an error. it will set this property to the next match
	// at the time of the error (which was not what it was expecting at that point) 
	// and pass on an "error" match. the error should be scooped on the stack and 
	// this property should be returned, without looking at the input...
	this.errorEscape = null;

	// support tag literals
	this.tagLiterals = false || (options && options.tagLiterals);
}