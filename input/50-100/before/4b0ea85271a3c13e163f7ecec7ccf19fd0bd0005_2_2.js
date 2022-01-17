function onPaused(event, res) {
		var editor = _editorForURL(res.location.url);
		if (! editor) { return; }
		editor.setCursorPos(res.location.lineNumber, res.location.columnNumber);
		editor._codeMirror.setLineClass(res.location.lineNumber, "paused");
	}