function onRemoveBreakpoint(event, location) {
		var editor = _editorForURL(location.url);
		if (! editor) return;
		editor._codeMirror.clearMarker(location.lineNumber, null, "breakpoint");
	}