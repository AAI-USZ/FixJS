function (item, event) {
		if (!HTMLArea.isIEBeforeIE9) {
			this.editor.getSelection().setRanges(this.ranges);
		}
		var button = this.getButton(item.getItemId());
		if (button) {
			button.fireEvent('HTMLAreaEventContextMenu', button, event);
		} else if (item.getItemId() === 'DeleteTarget') {
				// Do not leave a non-ie table cell empty
			var parent = this.deleteTarget.parentNode;
			parent.normalize();
			if (!Ext.isIE && /^(td|th)$/i.test(parent.nodeName) && parent.childNodes.length == 1) {
					// Do not leave a non-ie table cell empty
				parent.appendChild(this.editor.document.createElement('br'));
			}
				// Try to find a reasonable replacement selection
			var nextSibling = this.deleteTarget.nextSibling;
			var previousSibling = this.deleteTarget.previousSibling;
			if (nextSibling) {
				this.editor.getSelection().selectNode(nextSibling, true);
			} else if (previousSibling) {
				this.editor.getSelection().selectNode(previousSibling, false);
			}
			HTMLArea.DOM.removeFromParent(this.deleteTarget);
			this.editor.updateToolbar();
		}
	}