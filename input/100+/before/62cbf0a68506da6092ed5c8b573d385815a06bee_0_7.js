function () {
		var range = this.createRange(),
			parentStart,
			parentEnd;
		if (Ext.isIE8 || Ext.isIE7 || Ext.isIE6) {
			if (this.getType() === 'Control') {
				parentStart = range.item(0);
				parentEnd = parentStart;
			} else {
				var rangeEnd = range.duplicate();
				range.collapse(true);
				parentStart = range.parentElement();
				rangeEnd.collapse(false);
				parentEnd = rangeEnd.parentElement();
			}
		} else {
			parentStart = range.startContainer;
			if (/^(body)$/i.test(parentStart.nodeName)) {
				parentStart = parentStart.firstChild;
			}
			parentEnd = range.endContainer;
			if (/^(body)$/i.test(parentEnd.nodeName)) {
				parentEnd = parentEnd.lastChild;
			}
		}
		while (parentStart && !HTMLArea.DOM.isBlockElement(parentStart)) {
			parentStart = parentStart.parentNode;
		}
		while (parentEnd && !HTMLArea.DOM.isBlockElement(parentEnd)) {
			parentEnd = parentEnd.parentNode;
		}
		return {
			start: parentStart,
			end: parentEnd
		};
	}