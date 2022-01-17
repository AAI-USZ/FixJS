function () {
	var expansion = {
		escape: "{unicode}|\\\\([\\x20-\\x7e]|{nonascii})",
		h: "[0-9a-f]",
		ident: "[-]?{nmstart}{nmchar}*",
		name: "{nmchar}+",
		nl: "\\n|\\r\\n|\\r|\\f",
		nmchar: "[_a-z0-9-]|{nonascii}|{escape}",
		nmstart: "[_a-z]|{nonascii}|{escape}",
		nonascii: "[\\x80-\\xd7ff\\xe000\\xfffd]",  // Can't include \x10000-\x10ffff -- too high for JavaScript
		num: "([0-9]+(\\.[0-9]*)?|[0-9]*\\.?[0-9]+)",
		string: "\\\"({stringchar}|\\')*\\\"|\\'({stringchar}|\\\")*\\'",
		stringchar: "{urlchar}| |\\\\{nl}",
		unicode: "\\\\{h}{1,6}({nl}|{wc})?",
		urlchar: "[\\t\x21\x23-\x26\x28-\x7e]|{nonascii}|{escape}", // 22 = ", 27 = '
		w: "{wc}*",
		wc: wsPatternString
	};

	// Sorted mostly by having frequently used tokens appear first
	//    leading:  If the first character is in this string, try the pattern
	//    all:  Include this pattern as a fallback if the per-letter matches
	//          do not provide a hit
	//    pattern:  String portion of the RegExp pattern
	var tokens = {
		// Doesn't ever match anything since .leading is "" and .all is false
		S: {
			leading: "",
			all: false,
			pattern: "{wc}+"
		},
		// These must appear before IDENT
		UNIT: {
			leading: ".0123456789-+", 
			all: false,
			pattern: "[-+]?{num}({ident}|%)?"
		},  // All forms of numbers and units
		UNICODE_RANGE: {
			leading: "U", 
			all: false,
			pattern: "U\\+({h}|\\?){1,6}(-{h}{1,6})?"
		},

		CLASS: {
			leading: ".", 
			all: false,
			pattern: "\\.{ident}"
		},
		HASH: {
			leading: "#", 
			all: false,
			pattern: "#{name}"
		},
		ATTRIB: {
			leading: "[", 
			all: false,
			pattern: "\\[{w}{ident}{w}([~|^$*]?={w}({ident}|{string}){w})?{w}\\]"
		},
		AT_SYMBOL: {
			leading: "@", 
			all: false,
			pattern: "@{name}"
		},  // All @ symbols
		STRING: {
			leading: "\"'", 
			all: false,
			pattern: "{string}"
		},
		CDO: {
			leading: "<", 
			all: false,
			pattern: "<!--"
		},
		CDC: {
			leading: "-", 
			all: false,
			pattern: "-->"
		},
		COMMENT: {
			leading: "/", 
			all: false,
			pattern: "\\/\\*[^*]*\\*+([^/][^*]*\\*+)*\\/"
		},
		MATCH: {
			leading: "~|^$*=",
			all: false,
			pattern: "[~|^$*]?="
		},  // All of the matching tokens stay here
		BOM: {
			leading: "\xfeff", 
			all: false,
			pattern: "\xfeff"
		},  // Byte order mark
		IMPORTANT: {
			leading: "!",
			all: false,
			pattern: "!{w}important"
		},
		COMBINATOR: {
			leading: "~+>",
			all: false,
			pattern: "[~+>]"
		},
		OPERATOR: {
			leading: "/,",
			all: false,
			pattern: "[/,]"
		},
		COMMA: {
			leading: ",",
			all: false,
			pattern: ","
		},
		COLON: {
			leading: ":",
			all: false,
			pattern: ":"
		},
		SEMICOLON: {
			leading: ";",
			all: false,
			pattern: ";"
		},
		BLOCK_OPEN: {
			leading: "{",
			all: false,
			pattern: "\\{"
		},
		BLOCK_CLOSE: {
			leading: "}",
			all: false,
			pattern: "\\}"
		},
		PAREN_CLOSE: {
			leading: ")",
			all: false,
			pattern: "\\)"
		},
		URL: {
			leading: "uU",
			all: false,
			pattern: "url\\({w}({string}|{urlchar}*){w}\\)"
		},

		// Always test against these patterns
		FUNCTION: {
			leading: "", 
			all: true,
			pattern: "{ident}([\\.]{ident})*\\("
		},  // URI lands in here
		IDENT: {
			leading: "-",
			all: true,
			pattern: "{ident}"
		},
		CHAR: {
			leading: "",
			all: true,
			pattern: "[^'\"]"
		},  // Matches nearly anything - must be near the end
		UNMATCHED: {
			leading: "",
			all: true,
			pattern: "."
		}  // Must be last, shouldn't be hit with valid CSS
	};

	for (var t1 in tokens) {
		expansion[t1] = tokens[t1].pattern;
	}

	// Expand all RegExp strings, set initial count
	for (var t2 in tokens) {
		tokens[t2].regexp = expandPatternToRegExp(tokens[t2].pattern, expansion);
		tokens[t2].count = 0;
	}

	return tokens;
}