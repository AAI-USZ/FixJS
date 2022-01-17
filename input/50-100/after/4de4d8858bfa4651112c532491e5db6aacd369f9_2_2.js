function (entity) {
		if (HTMLArea.isIEBeforeIE9) {
			this.editor.getSelection().insertHtml(entity);
		} else {
				// Firefox, WebKit and IE convert '&nbsp;' to '&amp;nbsp;'
			var node = this.editor.document.createTextNode(((Ext.isGecko || Ext.isWebKit || Ext.isIE) && entity == '&nbsp;') ? '\xA0' : entity);
			this.editor.getSelection().insertNode(node);
			this.editor.getSelection().selectNode(node, false);
		}
	}