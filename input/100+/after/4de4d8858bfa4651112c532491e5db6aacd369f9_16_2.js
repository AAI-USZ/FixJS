function (editor, combo, record, index) {
		var className = combo.getValue();
		var classNames = null;
		var fullNodeSelected = false;
		var statusBarSelection = this.editor.statusBar ? this.editor.statusBar.getSelection() : null;
		var range = this.editor.getSelection().createRange();
		var parent = this.editor.getSelection().getParentElement();
		var selectionEmpty = this.editor.getSelection().isEmpty();
		var ancestors = this.editor.getSelection().getAllAncestors();
		
		if (!selectionEmpty) {
				// The selection is not empty
			for (var i = 0; i < ancestors.length; ++i) {
				fullNodeSelected = (HTMLArea.isIEBeforeIE9 && ((statusBarSelection === ancestors[i] && ancestors[i].innerText === range.text) || (!statusBarSelection && ancestors[i].innerText === range.text)))
							|| (!HTMLArea.isIEBeforeIE9 && ((statusBarSelection === ancestors[i] && ancestors[i].textContent === range.toString()) || (!statusBarSelection && ancestors[i].textContent === range.toString())));
				if (fullNodeSelected) {
					if (this.isInlineElement(ancestors[i])) {
						parent = ancestors[i];
					}
					break;
				}
			}
				// Working around bug in Safari selectNodeContents
			if (!fullNodeSelected && Ext.isWebKit && statusBarSelection && this.isInlineElement(statusBarSelection) && statusBarSelection.textContent === range.toString()) {
				fullNodeSelected = true;
				parent = statusBarSelection;
			}
		}
		if (!selectionEmpty && !fullNodeSelected || (!selectionEmpty && fullNodeSelected && parent && HTMLArea.DOM.isBlockElement(parent))) {
				// The selection is not empty, nor full element, or the selection is full block element
			if (className !== "none") {
					// Add span element with class attribute
				var newElement = editor.document.createElement('span');
				HTMLArea.DOM.addClass(newElement, className);
				editor.getDomNode().wrapWithInlineElement(newElement, range);
				if (!HTMLArea.isIEBeforeIE9) {
					range.detach();
				}
			}
		} else {
			this.applyClassChange(parent, className);
		}
	}