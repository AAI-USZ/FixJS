function (node, endPoint) {
		this.get();
		if (!Ext.isEmpty(this.selection)) {
			if (HTMLArea.isIEBeforeIE9) {
					// IE8/7/6 cannot set this type of selection
				this.selectNodeContents(node, endPoint);
			} else if (Ext.isWebKit && /^(img)$/i.test(node.nodeName)) {
				this.selection.setBaseAndExtent(node, 0, node, 1);
			} else {
				var range = this.document.createRange();
				if (node.nodeType === HTMLArea.DOM.ELEMENT_NODE && /^(body)$/i.test(node.nodeName)) {
					if (Ext.isWebKit) {
						range.setStart(node, 0);
						range.setEnd(node, node.childNodes.length);
					} else {
						range.selectNodeContents(node);
					}
				} else {
					range.selectNode(node);
				}
				if (typeof(endPoint) !== 'undefined') {
					range.collapse(endPoint);
				}
				this.selectRange(range);
			}
		}
		return this;
	}