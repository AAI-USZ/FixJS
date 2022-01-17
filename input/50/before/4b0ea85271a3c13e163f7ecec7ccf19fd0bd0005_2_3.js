function onTrace(event, breakpoint) {
		var editor = _editorForURL(breakpoint.location.url);
		if (! editor) { return; }

		setTemporaryLineClass(editor, breakpoint.location.lineNumber, "trace", 1000);
	}