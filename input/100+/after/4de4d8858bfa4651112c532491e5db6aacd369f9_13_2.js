function (editor, combo, record, index) {
		var param = combo.getValue();
		var 	element,
			fullNodeSelected = false;
		var range = editor.getSelection().createRange();
		var parent = editor.getSelection().getParentElement();
		var selectionEmpty = editor.getSelection().isEmpty();
		var statusBarSelection = editor.statusBar ? editor.statusBar.getSelection() : null;
		if (!selectionEmpty) {
			var fullySelectedNode = editor.getSelection().getFullySelectedNode();
			if (fullySelectedNode) {
				fullNodeSelected = true;
				parent = fullySelectedNode;
			}
		}
		if (selectionEmpty || fullNodeSelected) {
			element = parent;
				// Set the style attribute
			this.setStyle(element, combo.itemId, param);
				// Remove the span tag if it has no more attribute
			if (/^span$/i.test(element.nodeName) && !HTMLArea.DOM.hasAllowedAttributes(element, this.allowedAttributes)) {
				editor.getDomNode().removeMarkup(element);
			}
		} else if (statusBarSelection) {
			element = statusBarSelection;
				// Set the style attribute
			this.setStyle(element, combo.itemId, param);
				// Remove the span tag if it has no more attribute
			if (/^span$/i.test(element.nodeName) && !HTMLArea.DOM.hasAllowedAttributes(element, this.allowedAttributes)) {
				editor.getDomNode().removeMarkup(element);
			}
		} else if (editor.getSelection().endPointsInSameBlock()) {
			element = editor.document.createElement('span');
				// Set the style attribute
			this.setStyle(element, combo.itemId, param);
				// Wrap the selection with span tag with the style attribute
			editor.getDomNode().wrapWithInlineElement(element, range);
			if (!HTMLArea.isIEBeforeIE9) {
				range.detach();
			}
		}
		return false;
	}