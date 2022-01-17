function () {
		var isEmpty = true;
		this.get();
		if (!Ext.isEmpty(this.selection)) {
			if (Ext.isIE8 || Ext.isIE7 || Ext.isIE6) {
				switch (this.selection.type) {
					case 'None':
						isEmpty = true;
						break;
					case 'Text':
						isEmpty = !this.createRange().text;
						break;
					default:
						isEmpty = !this.createRange().htmlText;
						break;
				}
			} else {
				isEmpty = this.selection.isCollapsed;
			}
		}
		return isEmpty;
	}