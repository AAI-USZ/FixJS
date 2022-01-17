f		var sol = stream.sol(), 
			ch, tch;
			
		state.block = false;	// indicates the start of a code block.

		ch = stream.peek(); 	// don't eat, to make matching simpler
		
		// check start of  blocks
		if (sol && /[<\/\*{}\-]/.test(ch)) {
			if (stream.match(reCodeBlockStart)) {
				state.block = true;
				return chain(stream, state, twTokenCode);
			}
			if (stream.match(reBlockQuote)) {
				return ret('quote', 'quote');
			}
			if (stream.match(reWikiCommentStart) || stream.match(reWikiCommentStop)) {
				return ret('code', 'comment');
			}
			if (stream.match(reJsCodeStart) || stream.match(reJsCodeStop) || stream.match(reXmlCodeStart) || stream.match(reXmlCodeStop)) {
				return ret('code', 'comment');
			}
			if (stream.match(reHR)) {
				return ret('hr', 'hr');
			}
		} // sol
		ch = stream.next();

		if (sol && /[\/\*!#;:>|]/.test(ch)) {
			if (ch == "!") { // tw header
				stream.skipToEnd();
				return ret("header", "header");
			}
			if (ch == "*") { // tw list
				stream.eatWhile('*');
				return ret("list", "comment");
			}
			if (ch == "#") { // tw numbered list
				stream.eatWhile('#');
				return ret("list", "comment");
			}
			if (ch == ";") { // definition list, term
				stream.eatWhile(';');
				return ret("list", "comment");
			}
			if (ch == ":") { // definition list, description
				stream.eatWhile(':');
				return ret("list", "comment");
			}
			if (ch == ">") { // single line quote
				stream.eatWhile(">");
				return ret("quote", "quote");
			}
			if (ch == '|') {
				return ret('table', 'header');
			}
		}

		if (ch == '{' && stream.match(/\{\{/)) {
			return chain(stream, state, twTokenCode);
		}

		// rudimentary html:// file:// link matching. TW knows much more ...
		if (/[hf]/i.test(ch)) {
			if (/[ti]/i.test(stream.peek()) && stream.match(/\b(ttps?|tp|ile):\/\/[\-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/i)) {
				return ret("link", "link");
			}
		}
		// just a little string indicator, don't want to have the whole string covered
		if (ch == '"') {
			return ret('string', 'string');
		}
		if (ch == '~') {	// _no_ CamelCase indicator should be bold
			return ret('text', 'brace');
		}
		if (/[\[\]]/.test(ch)) { // check for [[..]]
			if (stream.peek() == ch) {
				stream.next();
				return ret('brace', 'brace');
			}
		}
		if (ch == "@") {	// check for space link. TODO fix @@...@@ highlighting
			stream.eatWhile(isSpaceName);
			return ret("link", "link");
		}
		if (/\d/.test(ch)) {	// numbers
			stream.eatWhile(/\d/);
			return ret("number", "number");
		}
		if (ch == "/") { // tw invisible comment
			if (stream.eat("%")) {
				return chain(stream, state, twTokenComment);
			}
			else if (stream.eat("/")) { // 
				return chain(stream, state, twTokenEm);
			}
		}
		if (ch == "_") { // tw underline
			if (stream.eat("_")) {
				return chain(stream, state, twTokenUnderline);
			}
		}
		// strikethrough and mdash handling
		if (ch == "-") {
			if (stream.eat("-")) {
				// if strikethrough looks ugly, change CSS.
				if (stream.peek() != ' ')
					return chain(stream, state, twTokenStrike);
				// mdash
				if (stream.peek() == ' ')
					return ret('text', 'brace');
			}
		}
		if (ch == "'") { // tw bold
			if (stream.eat("'")) {
				return chain(stream, state, twTokenStrong);
			}
		}
		if (ch == "<") { // tw macro
			if (stream.eat("<")) {
				return chain(stream, state, twTokenMacro);
			}
		}
		else {
			return ret(ch);
		}

		// core macro handling
		stream.eatWhile(/[\w\$_]/);
		var word = stream.current(),
			known = textwords.propertyIsEnumerable(word) && textwords[word];

		return known ? ret(known.type, known.style, word) : ret("text", null, word);

	} // jsTokenBase()
