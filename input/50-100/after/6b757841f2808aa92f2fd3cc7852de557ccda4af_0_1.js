function setEditor(panel_window) {
		editor = panel_window.orionEditor;
		console.log('setEditor', editor);
		if (buffer) {
			console.log('loading buffer');
			load(buffer.content, buffer.line);
			buffer = null;
		}
	}