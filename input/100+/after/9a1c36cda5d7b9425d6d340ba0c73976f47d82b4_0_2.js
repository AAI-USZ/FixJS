function () {
		var iframe = this.getEl().dom;
			// All browsers
		if (!iframe || (!iframe.contentWindow && !iframe.contentDocument)) {
			this.initializeIframe.defer(50, this);
			// All except WebKit
		} else if (iframe.contentWindow && !Ext.isWebKit && (!iframe.contentWindow.document || !iframe.contentWindow.document.documentElement)) {
			this.initializeIframe.defer(50, this);
			// WebKit
		} else if (Ext.isWebKit && (!iframe.contentDocument.documentElement || !iframe.contentDocument.body)) {
			this.initializeIframe.defer(50, this);
		} else {
			this.document = iframe.contentWindow ? iframe.contentWindow.document : iframe.contentDocument;
			this.getEditor().document = this.document;
			this.getEditor()._doc = this.document;
			this.getEditor()._iframe = iframe;
			this.initializeCustomTags();
			this.createHead();
			this.getStyleSheets();
		}
	}