function onSetBreakpoint(event, location) {
		var editor = _editorForURL(location.url);
		if (! editor) return;
		editor._codeMirror.setMarker(location.lineNumber, null, "breakpoint");
	}