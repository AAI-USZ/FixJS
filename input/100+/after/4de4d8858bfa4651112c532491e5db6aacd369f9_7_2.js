function (parentElement) {
		var range = this.editor.getSelection().createRange();
		var endBlocks = this.editor.getSelection().getEndBlocks();
		if (this.editor.getSelection().isEmpty() && /^dd$/i.test(parentElement.nodeName)) {
			var list = parentElement.appendChild(this.editor.document.createElement('dl'));
			var term = list.appendChild(this.editor.document.createElement('dt'));
			if (!HTMLArea.isIEBeforeIE9) {
				if (Ext.isWebKit) {
					term.innerHTML = '<br />';
				} else {
					term.appendChild(this.editor.document.createTextNode(''));
				}
			} else {
				term.innerHTML = '\x20';
			}
			this.editor.getSelection().selectNodeContents(term, false);
			return true;
		} else if (endBlocks.start && /^dt$/i.test(endBlocks.start.nodeName) && endBlocks.start.previousSibling) {
			var sibling = endBlocks.start.previousSibling;
			var bookmark = this.editor.getBookMark().get(range);
			if (/^dd$/i.test(sibling.nodeName)) {
				var list = this.wrapSelectionInBlockElement('dl');
				list = sibling.appendChild(list);
					// May need to merge the list if it has a previous sibling
				if (list.previousSibling && /^dl$/i.test(list.previousSibling.nodeName)) {
					while (list.firstChild) {
						list.previousSibling.appendChild(list.firstChild);
					}
					HTMLArea.DOM.removeFromParent(list);
				}
			} else if (/^dt$/i.test(sibling.nodeName)) {
				var definition = this.editor.document.createElement('dd');
				definition.appendChild(this.wrapSelectionInBlockElement('dl'));
				sibling.parentNode.insertBefore(definition, sibling.nextSibling);
			}
			this.editor.getSelection().selectRange(this.editor.getBookMark().moveTo(bookmark));
			return true;
		}
		return false;
	}