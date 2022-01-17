function () {
		var bookmark = null, bookmarkedText = null;
			// Insert a bookmark
		if (this.getEditorMode() === 'wysiwyg' && this.editor.isEditable()) {
			if ((!Ext.isIE && !(Ext.isOpera && navigator.userAgent.toLowerCase().indexOf('presto/2.1') != -1)) || (Ext.isIE && this.editor.getSelection().getType() !== 'Control')) {
					// Catch error in FF when the selection contains no usable range
				try {
					bookmark = this.editor.getBookMark().get(this.editor.getSelection().createRange());
				} catch (e) {
					bookmark = null;
				}
			}
				// Get the bookmarked html text and remove the bookmark
			if (bookmark) {
				bookmarkedText = this.editor.getInnerHTML();
				var range = this.editor.getBookMark().moveTo(bookmark);
					// Restore Firefox selection
				if (Ext.isGecko) {
					this.editor.getSelection().selectRange(range);
				}
			}
		}
		return {
			text		: this.editor.getInnerHTML(),
			bookmark	: bookmark,
			bookmarkedText	: bookmarkedText
		};
	}