function () {
		if (HTMLArea.isIEBeforeIE9) {
			Ext.each(this.config.customTags, function (tag) {
				this.document.createElement(tag);
			}, this);
		}
	}