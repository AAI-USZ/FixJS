function addFunctionTracepoints(url, node) {
		var tracepoints = [];

		// Name of the function
		var name  = node.id ? node.id.name : "<anonymous>";
		
		// Now add two tracepoints, one at the beginning, one at the end of the function
		for (var key in node.loc) {
			var loc = node.loc[key];
			var location = {
				url: url,
				// Esprima lines are 1-based
				lineNumber: loc.line - 1,
				// The end tracepoint needs be before }, not after, else it's hit right with the first one
				columnNumber: key === 'end' ? loc.column - 1 : loc.column
			};
			var tracepoint = Debugger.setTracepoint(location);
			tracepoints.push(tracepoint);
		}
		
		// Remember the tracepoints
		node.tracepoints = tracepoints;
		if (! tracepointsForUrl[url]) {
			tracepointsForUrl[url] = [];
		}		tracepointsForUrl[url] = tracepointsForUrl[url].concat(tracepoints);
	}
