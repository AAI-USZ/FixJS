function(template, name) {
		var parsed;
		
		name = name || '<unknown>';
		
		try {
			parsed = parser.parse(preprocess(template));
		} catch(e) {
			throw new Error(
				"In " + name + " on line " + e.line +
				(typeof e.column !== 'undefined' ?  ", character " + e.column : '') +
				": " + e.message
			);
		}
		
		return parsed;
	}