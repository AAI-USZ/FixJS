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
		/**
		 ***********************************************
		 * THIS FUNCTION IS DEPRECATED AS OF TYPO3 4.6 *
		 ***********************************************
		 * Extends class HTMLArea[pluginName]
		 *
		 * Defined for backward compatibility only
		 * Use Ext.extend(SubClassName, config) directly
		 */
		HTMLArea[pluginName].extend = function (config) {
			return Ext.extend(HTMLArea[pluginName], config);
		};
	}