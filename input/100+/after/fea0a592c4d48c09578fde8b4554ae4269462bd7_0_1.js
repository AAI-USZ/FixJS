function(log) {
	var opcodeInfo = {
		// MSB defines opcode base, LSB defines variant
		'START':  {base: 0x00, numArgs: 0},
		'NOP':    {base: 0x00, numArgs: 0},
		'READC':  {base: 0x10, numArgs: 1},
		'WRITEC': {base: 0x20, numArgs: 1},
		'WRITEI': {base: 0x30, numArgs: 1},
		'SET':    {base: 0x40, numArgs: 2},
		'ADD':    {base: 0x50, numArgs: 2},
		'SUB':    {base: 0x60, numArgs: 2},
		'MUL':    {base: 0x70, numArgs: 2},
		'DIV':    {base: 0x80, numArgs: 2},
		'JZ':     {base: 0x90, numArgs: 2},
		'JNZ':    {base: 0xA0, numArgs: 2},
		'JGT':    {base: 0xB0, numArgs: 3},
		'COPY':   {base: 0xC0, numArgs: 2},
		'DUMP':   {base: 0xE0, numArgs: 2},
		// ...
		'END':    {base: 0xF0, numArgs: 0},
	}


	var okay  = true;
	var error = '';
	function decode(opBase, operands) {
		// Last 4 bits of opBase are markers for indirect
		// access to the operand. They will be set to 1
		// if the operand starts with an @

		operation = [];
		for(i=0; i < operands.length; i++) {
			var operand = operands[i];
			if (operand.content[0] == '@') {
				// Indirect! Depending on which operand we're working on,
				// we need to set the corresponding bit:
				//       i = 0  -->  0b0001
				//       i = 1  -->  0b0010
				//       i = 2  -->  0b0100
				//       i = 3  -->  0b1000
				// then the last bit should be set to 1, resulting in 1101 0001
				opBase = opBase | (1 << i);

				// Remove the @ from the operand
				operand.content = operand.content.substr(1);
			}

			// TODO: decode aliases
			operation.push(parseInt(operand.content));
		}

		// Before returning, we need to insert the operator
		// in front of our list. Not very efficient, but simple.
		operation.unshift(opBase);
		return operation;
	}

	function parse(text) {
		var tokens = tokenize(text);

		if(tokens == null) {
			// Something bad happened
			return null;
		}

		var memory = [];
		var opcode;
		while (opcode = tokens.shift()) {
			// opcode.content MUST be an operation - otherwise
			// we have a syntax error.
			if(!(opcode.content in opcodeInfo)) {
				log("Syntax error on line " + opcode.line + ": Opcode unknown:" + opcode.content)
				return null;
			}
			var info = opcodeInfo[opcode.content];

			var operands = []
			for (var i = 0; i < info.numArgs; i++) {
				operands.push(tokens.shift());
			}

			// Decode operation: Operands may still contain
			// indirections(@). Note that
			// we already pass the integer form of the opcode
			// to the decode function - the name is not required
			// anymore...

			var operation = decode(info.base, operands);

			// Store decoded operation in memory
			for (var j = 0; j < operation.length; j++) {
				memory.push(operation[j]);
			}
		}

		if (memory == []) {
			// No code, or other problem
			return null;
		}

		return memory;
	}

	function tokenize(text) {

		tokens = [];

		var currentLine = 1;

		function word(match) {
			tokens.push({
				line:    currentLine,
				content: match[1]
			});
		}
		function dontCare(match) {
			// Not interested, not doing anything
		}
		function newline(match) {
			currentLine++;
		}

		// Regexes used for parsing. The parser works as
		// follows: Each of those regexps is tried on the
		// input. If one matches, the corresponding callback
		// function is called, and the matching part is
		// removed from the input. This is then repeated until
		// either the string didn't change it's size (which means
		// something unknown in input), or the input string is
		// reduced to an empty string (parsing done).
		var checks = [
			{ re: /^([!@\w\d]+)/, cb: word      }, // operator, operand
			{ re: /^#[^\n]*/,     cb: dontCare }, // a comment
			{ re: /^[\n]/,        cb: newline   }, // newline
			{ re: /^[\s]+/,       cb: dontCare }  // other whitespace
		]

		while (text.length > 0) {
			var lenBefore = text.length;
			for (var i = 0; i < checks.length; i++) {
				var check = checks[i];
				var match = text.match(check.re);
				if (match == null) {
					continue;
				}
				// If we reach this line, we have a match!
				check.cb(match);
				text = text.replace(check.re, '');
			}
			var lenAfter = text.length;
			if (lenAfter == lenBefore) {
				// Oops, none of our matches worked! This means syntax error
				nextFewBytes = text.substr(0, 10);
				log("Error: Unknown input near ..." + nextFewBytes + "... on line " + currentLine);

				// Return null, so caller knows something went wrong
				return null;
			}
		}

		return tokens;
	}

	return {
		parse: parse,
		okay:  function() {return okay;  },
		error: function() {return error; }
	}

}