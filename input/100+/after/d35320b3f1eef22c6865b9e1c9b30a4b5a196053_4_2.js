function (key, event) {
		var range = this.editor.getSelection().createRange();
		var parentElement = this.editor.getSelection().getParentElement();
		while (parentElement && !HTMLArea.DOM.isBlockElement(parentElement)) {
			parentElement = parentElement.parentNode;
		}
		if (/^(td|th)$/i.test(parentElement.nodeName)) {
			if (HTMLArea.isIEBeforeIE9) {
				range.pasteHTML('<br />');
				range.select();
			} else {
				var brNode = this.editor.document.createElement('br');
				this.editor.getSelection().insertNode(brNode);
				if (brNode.nextSibling) {
					this.editor.getSelection().selectNodeContents(brNode.nextSibling, true);
				} else {
					this.editor.getSelection().selectNodeContents(brNode, false);
				}
			}
			event.stopEvent();
			return false;
		}
		return true;
	}