function (button, mode, selectionEmpty, ancestors, endPointsInSameBlock) {
		if (mode === 'wysiwyg' && this.editor.isEditable()) {
			var statusBarSelection = this.editor.statusBar ? this.editor.statusBar.getSelection() : null;
			var range = this.editor.getSelection().createRange();
			var parent = this.editor.getSelection().getParentElement();
			switch (button.itemId) {
				case 'RightToLeft':
				case 'LeftToRight':
					if (parent) {
						var direction = (button.itemId === 'RightToLeft') ? 'rtl' : 'ltr';
						button.setInactive(parent.dir != direction && parent.style.direction != direction);
						button.setDisabled(/^body$/i.test(parent.nodeName));
					} else {
						button.setDisabled(true);
					}
					break;
				case 'ShowLanguageMarks':
					button.setInactive(!HTMLArea.DOM.hasClass(this.editor.document.body, 'htmlarea-show-language-marks'));
					break;
				case 'Language':
						// Updating the language drop-down
					var fullNodeSelected = false;
					var language = this.getLanguageAttribute(parent);
					if (!selectionEmpty) {
						if (endPointsInSameBlock) {
							for (var i = 0; i < ancestors.length; ++i) {
								fullNodeSelected = (statusBarSelection === ancestors[i])
									&& ((!HTMLArea.isIEBeforeIE9 && ancestors[i].textContent === range.toString()) || (HTMLArea.isIEBeforeIE9 && ((this.editor.getSelection().getType() !== 'Control' && ancestors[i].innerText === range.text) || (this.editor.getSelection().getType() === 'Control' && ancestors[i].innerText === range.item(0).text))));
								if (fullNodeSelected) {
									parent = ancestors[i];
									break;
								}
							}
								// Working around bug in Safari selectNodeContents
							if (!fullNodeSelected && Ext.isWebKit && statusBarSelection && statusBarSelection.textContent === range.toString()) {
								fullNodeSelected = true;
								parent = statusBarSelection;
							}
							language = this.getLanguageAttribute(parent);
						} else {
							language = this.getLanguageAttributeFromBlockElements();
						}
					}
					this.updateValue(button, language, selectionEmpty, fullNodeSelected, endPointsInSameBlock);
					break;
				default:
					break;
			}
		}
	}