function(node, range, keepLinks) {
		if (/^a$/i.test(node.nodeName)) {
			var intersection = false;
			if (!HTMLArea.isIEBeforeIE9) {
				this.editor.focus();
				intersection = HTMLArea.DOM.rangeIntersectsNode(range, node);
			} else {
				if (this.editor.getSelection().getType() === 'Control') {
						// we assume an image is selected
					intersection = true;
				} else {
					var nodeRange = this.editor.document.body.createTextRange();
					nodeRange.moveToElementText(node);
					intersection = range.inRange(nodeRange) || ((range.compareEndPoints('StartToStart', nodeRange) > 0) && (range.compareEndPoints('StartToEnd', nodeRange) < 0)) || ((range.compareEndPoints('EndToStart', nodeRange) > 0) && (range.compareEndPoints('EndToEnd', nodeRange) < 0));
				}
			}
			if (intersection) {
				this.cleanClassesAnchorImages(node);
				if (!keepLinks) {
					while (node.firstChild) {
						node.parentNode.insertBefore(node.firstChild, node);
					}
					node.parentNode.removeChild(node);
				}
			}
		} else {
			var child = node.firstChild,
				nextSibling;
			while (child) {
					// Save next sibling as child may be removed
				nextSibling = child.nextSibling;
				if (child.nodeType === HTMLArea.DOM.ELEMENT_NODE || child.nodeType === HTMLArea.DOM.DOCUMENT_FRAGMENT_NODE) {
					this.cleanAllLinks(child, range, keepLinks);
				}
				child = nextSibling;
			}
		}
	}