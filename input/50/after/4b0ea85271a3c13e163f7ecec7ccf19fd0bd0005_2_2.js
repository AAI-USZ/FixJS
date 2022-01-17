function onRemoveBreakpoint(event, location) {
		var editor = _editorForLocation(location);
		if (! editor) return;
		editor._codeMirror.clearMarker(location.lineNumber, null, "breakpoint");
	}