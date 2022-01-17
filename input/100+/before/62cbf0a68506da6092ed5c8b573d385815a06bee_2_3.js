function(node, range, cur_target, cur_class, cur_title, imageNode, addIconAfterLink, additionalValues) {
		if (/^a$/i.test(node.nodeName)) {
			var nodeInRange = false;
			if (!(Ext.isIE6 || Ext.isIE7 || Ext.isIE8)) {
				this.editor.focus();
				nodeInRange = HTMLArea.DOM.rangeIntersectsNode(range, node);
			} else {
				if (this.editor.getSelection().getType() === 'Control') {
						// we assume an image is selected
					nodeInRange = true;
				} else {
					var nodeRange = this.editor.document.body.createTextRange();
					nodeRange.moveToElementText(node);
					nodeInRange = nodeRange.inRange(range) || range.inRange(nodeRange) || (range.compareEndPoints('StartToStart', nodeRange) == 0) || (range.compareEndPoints('EndToEnd', nodeRange) == 0);
				}
			}
			if (nodeInRange) {
				if (imageNode != null) {
					if (addIconAfterLink) {
						node.appendChild(imageNode.cloneNode(false));
					} else {
						node.insertBefore(imageNode.cloneNode(false), node.firstChild);
					}
				}
				if (Ext.isGecko) {
					node.href = decodeURI(node.href);
				}
				if (cur_target.trim()) node.target = cur_target.trim();
					else node.removeAttribute('target');
				if (cur_class.trim()) {
					node.className = cur_class.trim();
				} else {
					if (!Ext.isOpera) {
						node.removeAttribute('class');
						if (Ext.isIE6 || Ext.isIE7 || Ext.isIE8) {
							node.removeAttribute('className');
						}
					} else {
						node.className = '';
					}
				}
				if (cur_title.trim()) {
					node.title = cur_title.trim();
				} else {
					node.removeAttribute('title');
					node.removeAttribute('rtekeep');
				}
				if (this.pageTSConfiguration && this.pageTSConfiguration.additionalAttributes && typeof(additionalValues) == 'object') {
					for (additionalAttribute in additionalValues) {
						if (additionalValues.hasOwnProperty(additionalAttribute)) {
							if (additionalValues[additionalAttribute].toString().trim()) {
								node.setAttribute(additionalAttribute, additionalValues[additionalAttribute]);
							} else {
								node.removeAttribute(additionalAttribute);
							}
						}
					}
				}
			}
		} else {
			for (var i = node.firstChild; i; i = i.nextSibling) {
				if (i.nodeType === HTMLArea.DOM.ELEMENT_NODE || i.nodeType === HTMLArea.DOM.DOCUMENT_FRAGMENT_NODE) {
					this.setLinkAttributes(i, range, cur_target, cur_class, cur_title, imageNode, addIconAfterLink, additionalValues);
				}
			}
		}
	}