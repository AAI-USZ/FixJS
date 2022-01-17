function(template, name) {
		var parsed;
		
		currentTemplate = name || '<unknown>';
		
		try {
			parsed = parser.parse(preprocess(template));
		} catch(e) {
			e.message += " in '" + currentTemplate + "' on line " + e.line +
				(typeof e.column !== 'undefined' ?  ", character " + e.column : '');
						
			currentTemplate = undefined;
			throw e;
		}
		
		currentTemplate = undefined;
		
		return parsed;
	}