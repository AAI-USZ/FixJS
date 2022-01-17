function onResumed(event, res) {
		if (res.location) {
			var editor = _editorForURL(res.location.url);
			if (! editor) { return; }
			editor._codeMirror.setLineClass(res.location.lineNumber);
		}
	}