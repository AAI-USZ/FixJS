function onTokenHover(token, cursor, cmLinesNode, cm) {
		// Close the popup
		removePopup();

		// No token hovered? We're done
		if (! token) { return; }

		// Get the functions and variables of the current document or abort
		var url       = DocumentManager.getCurrentDocument().url;
		var details   = Parser.getCacheForUrl(url);
		var variables = details.variables;
		var functions = details.functions;
		if (! variables || ! functions) { return; }

		// Find the variable for this token, else abort
		// CodeMirror lines are 0-based, Esprima lines are 1-based
		var line     = cursor.line + 1;
		var column   = token.start;
		var variable = variables[line] ? variables[line][column] : null;
		if (! variable) { return; }

		// Find the function surrounding the variable, else abort
		var fn = findWrappingFunction(functions, cursor, token);
		if (! fn) { return; }

		var resolveBefore = resolveVariable(fn.tracepoints[0], variable);
		var resolveAfter  = resolveVariable(fn.tracepoints[1], variable);
		$.when(resolveBefore, resolveAfter).done(function (before, after) {
			before = describeValue(before);
			after  = describeValue(after);
			if (before !== after) {
				before += " ↦ " + after;
			}
			$popup = showValue(before, cursor.line, token.start, token.end, cmLinesNode, cm);
		});
	}