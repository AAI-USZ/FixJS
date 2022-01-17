function (dropDownId) {
		var editor = this.editor;
		if (this.getEditorMode() === "wysiwyg" && this.editor.isEditable()) {
			var tagName = false, classNames = Array(), fullNodeSelected = false;
			var statusBarSelection = editor.statusBar ? editor.statusBar.getSelection() : null;
			var range = editor.getSelection().createRange();
			var parent = editor.getSelection().getParentElement();
			var ancestors = editor.getSelection().getAllAncestors();
			if (parent && !HTMLArea.DOM.isBlockElement(parent)) {
				tagName = parent.nodeName.toLowerCase();
				if (parent.className && /\S/.test(parent.className)) {
					classNames = parent.className.trim().split(" ");
				}
			}
			var selectionEmpty = editor.getSelection().isEmpty();
			if (!selectionEmpty) {
				for (var i = 0; i < ancestors.length; ++i) {
					fullNodeSelected = (statusBarSelection === ancestors[i])
						&& ((!Ext.isIE && ancestors[i].textContent === range.toString()) || (Ext.isIE && ancestors[i].innerText === range.text));
					if (fullNodeSelected) {
						if (!HTMLArea.DOM.isBlockElement(ancestors[i])) {
							tagName = ancestors[i].nodeName.toLowerCase();
							if (ancestors[i].className && /\S/.test(ancestors[i].className)) {
								classNames = ancestors[i].className.trim().split(" ");
							}
						}
						break;
					}
				}
					// Working around bug in Safari selectNodeContents
				if (!fullNodeSelected && Ext.isWebKit && statusBarSelection && this.isInlineElement(statusBarSelection) && statusBarSelection.textContent === range.toString()) {
					fullNodeSelected = true;
					tagName = statusBarSelection.nodeName.toLowerCase();
					if (statusBarSelection.className && /\S/.test(statusBarSelection.className)) {
						classNames = statusBarSelection.className.trim().split(" ");
					}
				}
			}
			var selectionInInlineElement = tagName && this.REInlineTags.test(tagName);
			var disabled = !editor.getSelection().endPointsInSameBlock() || (fullNodeSelected && !tagName) || (selectionEmpty && !selectionInInlineElement);
			if (!disabled && !tagName) {
				tagName = "span";
			}
			this.updateValue(dropDownId, tagName, classNames, selectionEmpty, fullNodeSelected, disabled);
		} else {
			var dropDown = this.getButton(dropDownId);
			if (dropDown) {
				dropDown.setDisabled(!dropDown.textMode);
			}
		}
	}