function () {
		var range = this.createRange();
		if (Ext.isIE8 || Ext.isIE7 || Ext.isIE6) {
			if (this.getType() === 'Control') {
					// Deleting or backspacing on a control selection : delete the element
				var element = this.getParentElement();
				var parent = element.parentNode;
				parent.removeChild(el);
				return true;
			} else if (this.isEmpty()) {
					// Check if deleting an empty block with a table as next sibling
				var element = this.getParentElement();
				if (!element.innerHTML && HTMLArea.DOM.isBlockElement(element) && element.nextSibling && /^table$/i.test(element.nextSibling.nodeName)) {
					var previous = element.previousSibling;
					if (!previous) {
						this.selectNodeContents(element.nextSibling.rows[0].cells[0], true);
					} else if (/^table$/i.test(previous.nodeName)) {
						this.selectNodeContents(previous.rows[previous.rows.length-1].cells[previous.rows[previous.rows.length-1].cells.length-1], false);
					} else {
						range.moveStart('character', -1);
						range.collapse(true);
						range.select();
					}
					el.parentNode.removeChild(element);
					return true;
				}
			} else {
					// Backspacing into a link
				var range2 = range.duplicate();
				range2.moveStart('character', -1);
				var a = range2.parentElement();
				if (a != range.parentElement() && /^a$/i.test(a.nodeName)) {
					range2.collapse(true);
					range2.moveEnd('character', 1);
					range2.pasteHTML('');
					range2.select();
					return true;
				}
				return false;
			}
		} else {
			var self = this;
			window.setTimeout(function() {
				var range = self.createRange();
				var startContainer = range.startContainer;
				var startOffset = range.startOffset;
					// If the selection is collapsed...
				if (self.isEmpty()) {
						// ... and the cursor lies in a direct child of body...
					if (/^(body)$/i.test(startContainer.nodeName)) {
						var node = startContainer.childNodes[startOffset];
					} else if (/^(body)$/i.test(startContainer.parentNode.nodeName)) {
						var node = startContainer;
					} else {
						return false;
					}
						// ... which is a br or text node containing no non-whitespace character
					if (/^(br|#text)$/i.test(node.nodeName) && !/\S/.test(node.textContent)) {
							// Get a meaningful previous sibling in which to reposition de cursor
						var previousSibling = node.previousSibling;
						while (previousSibling && /^(br|#text)$/i.test(previousSibling.nodeName) && !/\S/.test(previousSibling.textContent)) {
							previousSibling = previousSibling.previousSibling;
						}
							// If there is no meaningful previous sibling, the cursor is at the start of body
						if (previousSibling) {
								// Remove the node
							HTMLArea.DOM.removeFromParent(node);
								// Position the cursor
							if (/^(ol|ul|dl)$/i.test(previousSibling.nodeName)) {
								self.selectNodeContents(previousSibling.lastChild, false);
							} else if (/^(table)$/i.test(previousSibling.nodeName)) {
								self.selectNodeContents(previousSibling.rows[previousSibling.rows.length-1].cells[previousSibling.rows[previousSibling.rows.length-1].cells.length-1], false);
							} else if (!/\S/.test(previousSibling.textContent) && previousSibling.firstChild) {
								self.selectNode(previousSibling.firstChild, true);
							} else {
								self.selectNodeContents(previousSibling, false);
							}
						}
					}
				}
			}, 10);
			return false;	
		}
	}