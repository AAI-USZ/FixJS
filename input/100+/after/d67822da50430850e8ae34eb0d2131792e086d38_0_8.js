function () {
		var range = this.createRange(),
			html = '';
		if (HTMLArea.isIEBeforeIE9) {
			if (this.getType() === 'Control') {
					// We have a controlRange collection
				var bodyRange = this.document.body.createTextRange();
				bodyRange.moveToElementText(range(0));
				html = bodyRange.htmlText;
			} else {
				html = range.htmlText;
			}
		} else if (!range.collapsed) {
			var cloneContents = range.cloneContents();
			if (!cloneContents) {
				cloneContents = this.document.createDocumentFragment();
			}
			html = this.editor.iframe.htmlRenderer.render(cloneContents, false);
		}
		return html;
	}