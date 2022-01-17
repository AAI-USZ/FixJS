function (editor, pluginName) {
		this.editor = editor;
		this.editorNumber = editor.editorId;
		this.editorId = editor.editorId;
		this.editorConfiguration = editor.config;
		this.name = pluginName;
		try {
			this.I18N = HTMLArea.I18N[this.name];
		} catch(e) {
			this.I18N = new Object();
		}
		this.configurePlugin(editor);
	}