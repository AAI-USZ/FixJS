function onTraceSelected(trace) {
		if (! trace) { return; }
		var l = trace.location;
		GotoAgent.open(l.url, { line: l.lineNumber, ch: l.columnNumber });
	}