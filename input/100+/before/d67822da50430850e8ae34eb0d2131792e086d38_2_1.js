function(theLink,cur_target,cur_class,cur_title,additionalValues) {
		var range, anchorClass, imageNode = null, addIconAfterLink;
		this.restoreSelection();
		var node = this.editor.getSelection().getFirstAncestorOfType('a');
		if (!node) {
			node = this.editor.getSelection().getParentElement();
		}
		if (HTMLArea.classesAnchorSetup && cur_class) {
			for (var i = HTMLArea.classesAnchorSetup.length; --i >= 0;) {
				anchorClass = HTMLArea.classesAnchorSetup[i];
				if (anchorClass.name == cur_class && anchorClass.image) {
					imageNode = this.editor.document.createElement('img');
					imageNode.src = anchorClass.image;
					imageNode.alt = anchorClass.altText;
					addIconAfterLink = anchorClass.addIconAfterLink;
					break;
				}
			}
		}
		if (node != null && /^a$/i.test(node.nodeName)) {
				// Update existing link
			this.editor.getSelection().selectNode(node);
			range = this.editor.getSelection().createRange();
				// Clean images, keep links
			if (HTMLArea.classesAnchorSetup) {
				this.cleanAllLinks(node, range, true);
			}
				// Update link href
				// In IE, setting href may update the content of the element. We don't want this feature.
			if (Ext.isIE) {
				var content = node.innerHTML;
			}
			node.href = Ext.isGecko ? encodeURI(theLink) : theLink;
			if (Ext.isIE) {
				node.innerHTML = content;
			}
				// Update link attributes
			this.setLinkAttributes(node, range, cur_target, cur_class, cur_title, imageNode, addIconAfterLink, additionalValues);
		} else {
				// Create new link
				// Cleanup selected range
			range = this.editor.getSelection().createRange();
				// Clean existing anchors otherwise Mozilla may create nested anchors while IE may update existing link
			if (Ext.isIE8 || Ext.isIE7 || Ext.isIE6) {
				this.cleanAllLinks(node, range, true);
				this.editor.getSelection().execCommand('UnLink', false, null);
			} else {
					// Selection may be lost when cleaning links
					// Note: In IE6-8, the following procedure breaks the selection used by the execCommand
				var bookMark = this.editor.getBookMark().get(range);
				this.cleanAllLinks(node, range);
				range = this.editor.getBookMark().moveTo(bookMark);
				this.editor.getSelection().selectRange(range);
			}
			if (Ext.isGecko) {
				this.editor.getSelection().execCommand('CreateLink', false, encodeURI(theLink));
			} else {
				this.editor.getSelection().execCommand('CreateLink', false, theLink);
			}
				// Get the created link or parent
			node = this.editor.getSelection().getParentElement();
			if (node) {
					// Export trailing br that IE may include in the link
				if (Ext.isIE) {
					if (node.lastChild && /^br$/i.test(node.lastChild.nodeName)) {
						HTMLArea.DOM.removeFromParent(node.lastChild);
						node.parentNode.insertBefore(this.editor.document.createElement('br'), node.nextSibling);
					}
				}
					// We may have created multiple links in as many blocks
				this.setLinkAttributes(node, range, cur_target, cur_class, cur_title, imageNode, addIconAfterLink, additionalValues);
			}
		}
		this.close();
	}