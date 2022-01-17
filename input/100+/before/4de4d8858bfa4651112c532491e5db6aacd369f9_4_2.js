function parseTree(root) {
			var tag = root.nodeName.toLowerCase(), next;
			switch (root.nodeType) {
				case HTMLArea.DOM.ELEMENT_NODE:
					if (/^(meta|style|title|link)$/.test(tag)) {
						root.parentNode.removeChild(root);
						return false;
						break;
					}
				case HTMLArea.DOM.TEXT_NODE:
				case HTMLArea.DOM.DOCUMENT_NODE:
				case HTMLArea.DOM.DOCUMENT_FRAGMENT_NODE:
					if ((Ext.isIE && root.scopeName != 'HTML') || (!Ext.isIE && /:/.test(tag)) || /o:p/.test(tag)) {
						stripTag(root);
						return false;
					} else {
						clearClass(root);
						clearStyle(root);
						for (var i = root.firstChild; i; i = next) {
							next = i.nextSibling;
							if (i.nodeType !== HTMLArea.DOM.TEXT_NODE && parseTree(i)) {
								checkEmpty(i);
							}
						}
					}
					return true;
					break;
				default:
					root.parentNode.removeChild(root);
					return false;
					break;
			}
		}