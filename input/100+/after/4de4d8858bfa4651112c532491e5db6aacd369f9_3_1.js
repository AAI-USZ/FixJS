function() {
		var range = this.editor.getSelection().createRange();
		var parent = this.editor.getSelection().getParentElement();
		if (parent.firstChild && /^(a)$/i.test(parent.firstChild.nodeName)) {
			parent = parent.firstChild;
		}
		if (/^(a)$/i.test(parent.nodeName)) {
			parent.normalize();
			if (!parent.innerHTML || (parent.childNodes.length == 1 && /^(br)$/i.test(parent.firstChild.nodeName))) {
				if (!HTMLArea.isIEBeforeIE9) {
					var container = parent.parentNode;
					this.editor.getDomNode().removeMarkup(parent);
						// Opera does not render empty list items
					if (Ext.isOpera && /^(li)$/i.test(container.nodeName) && !container.firstChild) {
						container.innerHTML = '<br />';
						this.editor.getSelection().selectNodeContents(container, true);
					}
				} else {
					HTMLArea.DOM.removeFromParent(parent);
				}
			}
		}
		if (Ext.isWebKit) {
				// Remove Apple's span and font tags
			this.editor.getDomNode().cleanAppleStyleSpans(this.editor.document.body);
				// Reset Safari selection in order to prevent insertion of span and/or font tags on next text input
			var bookmark = this.editor.getBookMark().get(this.editor.getSelection().createRange());
			this.editor.getSelection().selectRange(this.editor.getBookMark().moveTo(bookmark));
		}
		this.editor.updateToolbar();
	}