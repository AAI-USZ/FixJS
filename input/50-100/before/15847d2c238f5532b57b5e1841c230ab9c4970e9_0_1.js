function () {
		if (Ext.isIE6 || Ext.isIE7 || Ext.isIE8 || (Ext.isIE && this.document.documentMode < 9)) {
			Ext.each(this.config.customTags, function (tag) {
				this.document.createElement(tag);
			}, this);
		}
	}