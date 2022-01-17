function onResumed(event, res) {
		if (res.halt && res.location) {
			var editor = _editorForLocation(res.location);
			if (! editor) { return; }
			editor._codeMirror.setLineClass(res.location.lineNumber);
		}
	}