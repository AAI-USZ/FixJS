function onTraceSelected(trace) {
		if (! trace) { return; }

		var summary = _summarizeTrace(trace);
		var doc = DocumentManager.getCurrentDocument();

		var focus = function () {
			var editor = EditorManager.getCurrentFullEditor();
			editor.setCursorPos(summary.line, summary.column);
			window.setTimeout(editor.focus.bind(editor), 0);
		};

		if (doc && doc.url === summary.url) {
			focus();
			return;
		}
		
		var path = summary.url.replace(/^file:\/\//, '');
		DocumentManager.getDocumentForPath(path).done(function (doc) {
			DocumentManager.setCurrentDocument(doc);
			focus();
		});
	}