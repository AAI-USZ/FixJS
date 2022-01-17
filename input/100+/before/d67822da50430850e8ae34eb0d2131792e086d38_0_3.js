function () {
		var range;
		this.get();
		if (Ext.isIE8 || Ext.isIE7 || Ext.isIE6) {
			range = this.selection.createRange();
		} else {
			if (Ext.isEmpty(this.selection)) {
				range = this.document.createRange();
			} else {
					// Older versions of WebKit did not support getRangeAt
				if (Ext.isWebKit && !Ext.isFunction(this.selection.getRangeAt)) {
					range = this.document.createRange();
					if (this.selection.baseNode == null) {
						range.setStart(this.document.body, 0);
						range.setEnd(this.document.body, 0);
					} else {
						range.setStart(this.selection.baseNode, this.selection.baseOffset);
						range.setEnd(this.selection.extentNode, this.selection.extentOffset);
						if (range.collapsed != this.selection.isCollapsed) {
							range.setStart(this.selection.extentNode, this.selection.extentOffset);
							range.setEnd(this.selection.baseNode, this.selection.baseOffset);
						}
					}
				} else {
					try {
						range = this.selection.getRangeAt(0);
					} catch (e) {
						range = this.document.createRange();
					}
				}
			}
		}
		return range;
	}