function (entity) {
		if (Ext.isIE) {
			this.editor.getSelection().insertHtml(entity);
		} else {
				// Firefox and WebKit convert '&nbsp;' to '&amp;nbsp;'
			var node = this.editor.document.createTextNode(((Ext.isGecko || Ext.isWebKit) && entity == '&nbsp;') ? '\xA0' : entity);
			this.editor.getSelection().insertNode(node);
			this.editor.getSelection().selectNode(node, false);
		}
	}