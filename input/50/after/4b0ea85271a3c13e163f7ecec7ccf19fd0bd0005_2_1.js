function onSetBreakpoint(event, location) {
		var editor = _editorForLocation(location);
		if (! editor) return;
		editor._codeMirror.setMarker(location.lineNumber, null, "breakpoint");
	}