function (href, title, target) {
		var a = this.link;
		if (!a) {
			this.restoreSelection();
			this.editor.getSelection().execCommand('CreateLink', false, href);
			a = this.editor.getSelection().getParentElement();
			if (!HTMLArea.isIEBeforeIE9 && !/^a$/i.test(a.nodeName)) {
				var range = this.editor.getSelection().createRange();
				if (range.startContainer.nodeType !== HTMLArea.DOM.TEXT_NODE) {
					a = range.startContainer.childNodes[range.startOffset];
				} else {
					a = range.startContainer.nextSibling;
				}
				this.editor.getSelection().selectNode(a);
			}
			var el = this.editor.getSelection().getFirstAncestorOfType('a');
			if (el != null) {
				a = el;
			}
		} else {
			a.href = href;
		}
		if (a && /^a$/i.test(a.nodeName)) {
			a.title = title;
			a.target = target;
			if (Ext.isOpera) {
				this.editor.getSelection().selectNodeContents(a, false);
			} else {
				this.editor.getSelection().selectNodeContents(a);
			}
		}
	}