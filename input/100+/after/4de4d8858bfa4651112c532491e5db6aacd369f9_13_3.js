function (select, mode, selectionEmpty, ancestors, endPointsInSameBlock) {
		var editor = this.editor;
		if (mode === 'wysiwyg' && editor.isEditable()) {
			var statusBarSelection = this.editor.statusBar ? this.editor.statusBar.getSelection() : null;
			var parentElement = statusBarSelection ? statusBarSelection : editor.getSelection().getParentElement();
			var value = parentElement.style[this.styleProperty[select.itemId]];
			if (!value) {
				if (!HTMLArea.isIEBeforeIE9) {
					if (editor.document.defaultView && editor.document.defaultView.getComputedStyle(parentElement, null)) {
						value = editor.document.defaultView.getComputedStyle(parentElement, null).getPropertyValue(this.cssProperty[select.itemId]);
					}
				} else {
					value = parentElement.currentStyle[this.styleProperty[select.itemId]];
				}
			}
			var store = select.getStore();
			var index = -1;
			if (value) {
				index = store.findBy(
					function (record, id) {
						return record.get('value').replace(/[\"\']/g, '') == value.replace(/, /g, ',').replace(/[\"\']/g, '');
					}
				);
			}
			if (index != -1) {
				select.setValue(store.getAt(index).get('value'));
			} else if (store.getCount()) {
				select.setValue('none');
			}
			select.setDisabled(!endPointsInSameBlock || (selectionEmpty && /^body$/i.test(parentElement.nodeName)));
		}
	}