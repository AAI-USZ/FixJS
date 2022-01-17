function (bookMark) {
		var range = this.selection.createRange();
		if (Ext.isIE8 || Ext.isIE7 || Ext.isIE6) {
			if (bookMark) {
				range.moveToBookmark(bookMark);
			}
		} else {
			var startSpan  = this.getEndPoint(bookMark, true);
			var endSpan    = this.getEndPoint(bookMark, false);
			var parent;
			if (startSpan) {
					// If the previous sibling is a text node, let the anchorNode have it as parent
				if (startSpan.previousSibling && startSpan.previousSibling.nodeType === HTMLArea.DOM.TEXT_NODE) {
					range.setStart(startSpan.previousSibling, startSpan.previousSibling.data.length);
				} else {
					range.setStartBefore(startSpan);
				}
				HTMLArea.DOM.removeFromParent(startSpan);
			} else {
					// For some reason, the startSpan was removed or its id attribute was removed so that it cannot be retrieved
				range.setStart(this.document.body, 0);
			}
				// If the bookmarked range was collapsed, the end span will not be available
			if (endSpan) {
					// If the next sibling is a text node, let the focusNode have it as parent
				if (endSpan.nextSibling && endSpan.nextSibling.nodeType === HTMLArea.DOM.TEXT_NODE) {
					range.setEnd(endSpan.nextSibling, 0);
				} else {
					range.setEndBefore(endSpan);
				}
				HTMLArea.DOM.removeFromParent(endSpan);
			} else {
				range.collapse(true);
			}
		}
		return range;
	}