function (node, endPoint) {
		var range;
		this.get();
		if (!Ext.isEmpty(this.selection)) {
			if (Ext.isIE8 || Ext.isIE7 || Ext.isIE6) {
				range = this.document.body.createTextRange();
				range.moveToElementText(node);
			} else {
				range = this.document.createRange();
				if (Ext.isWebKit) {
					range.setStart(node, 0);
					if (node.nodeType === HTMLArea.DOM.TEXT_NODE || node.nodeType === HTMLArea.DOM.COMMENT_NODE || node.nodeType === HTMLArea.DOM.CDATA_SECTION_NODE) {
						range.setEnd(node, node.textContent.length);
					} else {
						range.setEnd(node, node.childNodes.length);
					}
				} else {
					range.selectNodeContents(node);
				}
			}
			if (typeof(endPoint) !== 'undefined') {
				range.collapse(endPoint);
			}
			this.selectRange(range);
		}
		return this;
	}