function (toBeInserted) {
		if (Ext.isIE8 || Ext.isIE7 || Ext.isIE6) {
			this.insertHtml(toBeInserted.outerHTML);
		} else {
			var range = this.createRange();
			range.deleteContents();
			toBeSelected = (toBeInserted.nodeType === HTMLArea.DOM.DOCUMENT_FRAGMENT_NODE) ? toBeInserted.lastChild : toBeInserted;
			range.insertNode(toBeInserted);
			this.selectNodeContents(toBeSelected, false);
		}
		return this;
	}