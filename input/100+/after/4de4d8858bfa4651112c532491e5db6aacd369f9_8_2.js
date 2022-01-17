function (editor, element) {
		var range = editor.getSelection().createRange();
		var parent = editor.getSelection().getParentElement();
		var ancestors = editor.getSelection().getAllAncestors();
		var elementIsAncestor = false;
		var fullNodeSelected = false;
		if (HTMLArea.isIEBeforeIE9) {
			var bookmark = editor.getBookMark().get(range);
		}
			// Check if the chosen element is among the ancestors
		for (var i = 0; i < ancestors.length; ++i) {
			if ((ancestors[i].nodeType === HTMLArea.DOM.ELEMENT_NODE) && (ancestors[i].nodeName.toLowerCase() == element)) {
				elementIsAncestor = true;
				var elementAncestorIndex = i;
				break;
			}
		}
		if (!editor.getSelection().isEmpty()) {
			var fullySelectedNode = editor.getSelection().getFullySelectedNode();
			fullNodeSelected = this.isInlineElement(fullySelectedNode);
			if (fullNodeSelected) {
				parent = fullySelectedNode;
			}
			var statusBarSelection = (editor.statusBar ? editor.statusBar.getSelection() : null);
			if (element !== "none" && !(fullNodeSelected && elementIsAncestor)) {
					// Add markup
				var newElement = editor.document.createElement(element);
				if (element === "bdo") {
					newElement.setAttribute("dir", "rtl");
				}
				if (!HTMLArea.isIEBeforeIE9) {
					if (fullNodeSelected && statusBarSelection) {
						if (Ext.isWebKit) {
							newElement = parent.parentNode.insertBefore(newElement, statusBarSelection);
							newElement.appendChild(statusBarSelection);
							newElement.normalize();
						} else {
							range.selectNode(parent);
							editor.getDomNode().wrapWithInlineElement(newElement, range);
						}
						editor.getSelection().selectNodeContents(newElement.lastChild, false);
					} else {
						editor.getDomNode().wrapWithInlineElement(newElement, range);
					}
					range.detach();
				} else {
					var tagopen = "<" + element + ">";
					var tagclose = "</" + element + ">";
					if (fullNodeSelected) {
						if (!statusBarSelection) {
							parent.innerHTML = tagopen + parent.innerHTML + tagclose;
							if (element === "bdo") {
								parent.firstChild.setAttribute("dir", "rtl");
							}
							editor.getSelection().selectNodeContents(parent, false);
						} else {
							var content = parent.outerHTML;
							var newElement = this.remapMarkup(parent, element);
							newElement.innerHTML = content;
							editor.getSelection().selectNodeContents(newElement, false);
						}
					} else {
						editor.getDomNode().wrapWithInlineElement(newElement, range);
					}
				}
			} else {
					// A complete node is selected: remove the markup
				if (fullNodeSelected) {
					if (elementIsAncestor) {
						parent = ancestors[elementAncestorIndex];
					}
					var parentElement = parent.parentNode;
					editor.getDomNode().removeMarkup(parent);
					if (Ext.isWebKit && this.isInlineElement(parentElement)) {
						editor.getSelection().selectNodeContents(parentElement, false);
					}
				}
			}
		} else {
				// Remove or remap markup when the selection is collapsed
			if (parent && !HTMLArea.DOM.isBlockElement(parent)) {
				if ((element === 'none') || elementIsAncestor) {
					if (elementIsAncestor) {
						parent = ancestors[elementAncestorIndex];
					}
					editor.getDomNode().removeMarkup(parent);
				} else {
					var bookmark = this.editor.getBookMark().get(range);
					var newElement = this.remapMarkup(parent, element);
					this.editor.getSelection().selectRange(this.editor.getBookMark().moveTo(bookmark));
				}
			}
		}
	}