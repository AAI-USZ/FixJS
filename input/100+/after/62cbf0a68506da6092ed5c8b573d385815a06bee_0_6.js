function () {
		var parentElement,
			range;
		this.get();
		if (HTMLArea.isIEBeforeIE9) {
			range = this.createRange();
			switch (this.selection.type) {
				case 'Text':
				case 'None':
					parentElement = range.parentElement();
					if (/^(form)$/i.test(parentElement.nodeName)) {
						parentElement = this.document.body;
					} else if (/^(li)$/i.test(parentElement.nodeName) && range.htmlText.replace(/\s/g, '') == parentElement.parentNode.outerHTML.replace(/\s/g, '')) {
						parentElement = parentElement.parentNode;
					}
					break;
				case 'Control':
					parentElement = range.item(0);
					break;
				default:
					parentElement = this.document.body;
					break;
			}
		} else {
			if (this.getType() === 'Control') {
				parentElement = this.getElement();
			} else {
				range = this.createRange();
				parentElement = range.commonAncestorContainer;
					// Firefox 3 may report the document as commonAncestorContainer
				if (parentElement.nodeType === HTMLArea.DOM.DOCUMENT_NODE) {
					parentElement = this.document.body;
				} else {
					while (parentElement && parentElement.nodeType === HTMLArea.DOM.TEXT_NODE) {
						parentElement = parentElement.parentNode;
					}
				}
			}
		}
		return parentElement;
	}