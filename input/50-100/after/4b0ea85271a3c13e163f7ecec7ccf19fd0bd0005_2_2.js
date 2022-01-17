function onPaused(event, res) {
		var editor = _editorForLocation(res.location);
		if (! editor) { return; }

		if (res.halt) {
			editor.setCursorPos(res.location.lineNumber, res.location.columnNumber);
			editor._codeMirror.setLineClass(res.location.lineNumber, "paused");
		} else {
			setTemporaryLineClass(editor, res.location.lineNumber, "trace", 1000);
		}
	}