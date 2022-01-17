function (element) {
		var editor = this.getEditor();
		element.blur();
		if (!HTMLArea.isIEBeforeIE9) {
			if (/^(img|table)$/i.test(element.ancestor.nodeName)) {
				editor.getSelection().selectNode(element.ancestor);
			} else {
				editor.getSelection().selectNodeContents(element.ancestor);
			}
		} else {
			if (/^(img|table)$/i.test(element.ancestor.nodeName)) {
				var range = editor.document.body.createControlRange();
				range.addElement(element.ancestor);
				range.select();
			} else {
				editor.getSelection().selectNode(element.ancestor);
			}
		}
		this.setSelection(element.ancestor);
		this.noUpdate = true;
		editor.toolbar.update();
	}