function (html) {
		if (HTMLArea.isIEBeforeIE9) {
			this.get();
			if (this.getType() === 'Control') {
				this.selection.clear();
				this.get();
			}
			var range = this.createRange();
			range.pasteHTML(html);
		} else {
			this.editor.focus();
			var fragment = this.document.createDocumentFragment();
			var div = this.document.createElement('div');
			div.innerHTML = html;
			while (div.firstChild) {
				fragment.appendChild(div.firstChild);
			}
			this.insertNode(fragment);
		}
		return this;
	}