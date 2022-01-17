function _editorForURL(url) {
		var doc = DocumentManager.getCurrentDocument();
		if (doc && doc.url === url) {
			return EditorManager.getCurrentFullEditor();
		} else {
			console.log("No editor for url", url);
		}
		return null;
	}