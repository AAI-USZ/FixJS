function (toBeInserted) {
		if (HTMLArea.isIEBeforeIE9) {
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