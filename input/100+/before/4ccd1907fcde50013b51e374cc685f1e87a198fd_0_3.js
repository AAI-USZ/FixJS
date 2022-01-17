function findWrappingFunction(functions, cursor, token) {
		var fn;
		
		for (var i = 0; i < functions.length; i++) {
			var candidate    = functions[i];
			var start        = candidate.loc.start, end = candidate.loc.end;
			var startsBefore = start.line - 1 < cursor.line || (start.line - 1 === cursor.line && start.column < token.start);
			var endsAfter    = end.line - 1 > cursor.line || (end.line - 1 === cursor.line && end.column > token.end);

			// Assumption: any later function that surrounds the variable
			// is inside any previous surrounding function => just replace fn
			if (startsBefore && endsAfter) { fn = candidate; }
		}

		return fn;
	}