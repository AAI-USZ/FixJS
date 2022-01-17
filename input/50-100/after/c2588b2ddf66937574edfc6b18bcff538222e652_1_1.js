function onLineNumberClick(event) {
		// Todo: find the editor that was actually clicked
		var editor = EditorManager.getCurrentFullEditor();
		var pos    = editor._codeMirror.coordsChar({ x: event.clientX, y: event.clientY });
		
		var location = { url: editor.document.url, lineNumber: pos.line };
		Debugger.toggleBreakpoint(location);
	}