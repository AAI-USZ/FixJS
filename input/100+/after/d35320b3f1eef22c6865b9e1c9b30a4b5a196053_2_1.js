function (language) {
		var statusBarSelection = this.editor.statusBar ? this.editor.statusBar.getSelection() : null;
		var range = this.editor.getSelection().createRange();
		var parent = this.editor.getSelection().getParentElement();
		var selectionEmpty = this.editor.getSelection().isEmpty();
		var endPointsInSameBlock = this.editor.getSelection().endPointsInSameBlock();
		var fullNodeSelected = false;
		if (!selectionEmpty) {
			if (endPointsInSameBlock) {
				var ancestors = this.editor.getSelection().getAllAncestors();
				for (var i = 0; i < ancestors.length; ++i) {
					fullNodeSelected = (statusBarSelection === ancestors[i])
						&& ((!HTMLArea.isIEBeforeIE9 && ancestors[i].textContent === range.toString()) || (HTMLArea.isIEBeforeIE9 && ((this.editor.getSelection().getType() !== 'Control' && ancestors[i].innerText === range.text) || (this.editor.getSelection().getType() === 'Control' && ancestors[i].innerText === range.item(0).text))));
					if (fullNodeSelected) {
						parent = ancestors[i];
						break;
					}
				}
					// Working around bug in Safari selectNodeContents
				if (!fullNodeSelected && Ext.isWebKit && statusBarSelection && statusBarSelection.textContent === range.toString()) {
					fullNodeSelected = true;
					parent = statusBarSelection;
				}
			}
		}
		if (selectionEmpty || fullNodeSelected) {
				// Selection is empty or parent is selected in the status bar
			if (parent) {
					// Set language attributes
				this.setLanguageAttributes(parent, language);
			}
		} else if (endPointsInSameBlock) {
				// The selection is not empty, nor full element
			if (language != 'none') {
					// Add span element with lang attribute(s)
				var newElement = this.editor.document.createElement('span');
				this.setLanguageAttributes(newElement, language);
				this.editor.getDomNode().wrapWithInlineElement(newElement, range);
				if (!Ext.isIE) {
					range.detach();
				}
			}
		} else {
			this.setLanguageAttributeOnBlockElements(language);
		}
	}