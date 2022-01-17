function(log) {
	var opcodeInfo = {
		// MSB defines opcode base, LSB defines variant
		'START':  {base: 0x00, needlength: 1},
		'NOP':    {base: 0x00, needlength: 1},
		'READC':  {base: 0x10, needlength: 2},
		'WRITEC': {base: 0x20, needlength: 2},
		'WRITEI': {base: 0x30, needlength: 2},
		'SET':    {base: 0x40, needlength: 3},
		'ADD':    {base: 0x50, needlength: 3},
		'SUB':    {base: 0x60, needlength: 3},
		'MUL':    {base: 0x70, needlength: 3},
		'DIV':    {base: 0x80, needlength: 3},
		'JZ':     {base: 0x90, needlength: 3},
		'JNZ':    {base: 0xA0, needlength: 3},
		'JGT':    {base: 0xB0, needlength: 4},
		'COPY':   {base: 0xC0, needlength: 3},
		'DUMP':   {base: 0xE0, needlength: 3},
		// ...
		'END':    {base: 0xF0, needlength: 1},
	}

	function parseLine(line, lineno) {
		var chomped = line
			.replace(/#.*/, '') // remove comments
			.replace(/^\s*/, '') // remove leading space
			.replace(/\s*$/, '') // remove trailing space
		;

		if(chomped.length == 0) {
			// empty line, or (already-removed) comment
			return [];
		}
		var words = chomped.split(/\s+/);


		log("PARSER: LINE " + lineno + ": " + chomped);

		// see if opcode is valid
		if(words[0] in opcodeInfo) {
			var op_text = words[0];
			var opinfo = opcodeInfo[op_text];
			// convert opcode text to integer
			words[0] = opinfo.base;
			
			// check operation length
			if (opinfo.needlength != words.length) {
				var error = "Syntax error at line " + lineno + ": " +
					"Opcode " + op_text + " requires " + (opinfo.needlength-1) +
					" parameters, got " + (words.length-1);
				log("PARSER: " + error);
				return error;
			}

		}
		else {
			var error = "Syntax error at line " + lineno + ": " + "Opcode not known: " + words[0];
			log("PARSER: " + error);
			return error;
		}

		// parse parameters
		var variant = 0;
		for (var i = 1; i < words.length; i++) {
			var word = words[i];
			if (word[0] == '@') {
				// indirect param. set variant for that position
				var pos = i - 1;
				log("        Param "+i+" is indirect");
				var mask = 1 << pos;
				variant = variant | mask;
				words[i] = parseInt(word.substr(1));
			}
			else {
				words[i] = parseInt(word);
			}
		}

		words[0] = words[0] + variant;
		log("        OP combined: "+words[0].toString(16));
		
		return words;
	}

	var okay  = true;
	var error = '';

	function parse(text) {
		okay  = true;
		error = '';

		var lines = text.split(/\n/);

		var ll = lines.length;
		memory = [];
		for (var i = 0; i < ll; i++) {
			var operation = parseLine(lines[i], i+1);
			if (typeof operation == 'string') {
				error = operation;
				okay  = false;
				return false;
			}
			for (var j = 0; j < operation.length; j++) {
				memory.push(operation[j]);
			}
		}

		return memory;
	}

	return {
		parse: parse,
		okay:  function() {return okay;  },
		error: function() {return error; }
	}

}