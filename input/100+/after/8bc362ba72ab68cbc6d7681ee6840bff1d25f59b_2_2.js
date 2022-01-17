function (buttonPressed) {
			// If no dialogue window was opened, the selection should not be restored
		if (!buttonPressed) {
			this.restoreSelection();
		}
		var node = this.editor.getSelection().getParentElement();
		var el = this.editor.getSelection().getFirstAncestorOfType('a');
		if (el != null) {
			node = el;
		}
		if (node != null && /^a$/i.test(node.nodeName)) {
			this.editor.getSelection().selectNode(node);
		}
		if (HTMLArea.classesAnchorSetup) {
			var range = this.editor.getSelection().createRange();
			if (!HTMLArea.isIEBeforeIE9) {
				this.cleanAllLinks(node, range, false);
			} else {
				this.cleanAllLinks(node, range, true);
				this.editor.getSelection().execCommand('Unlink', false, '');
			}
		} else {
			this.editor.getSelection().execCommand('Unlink', false, '');
		}
		if (this.dialog) {
			this.close();
		}
	}