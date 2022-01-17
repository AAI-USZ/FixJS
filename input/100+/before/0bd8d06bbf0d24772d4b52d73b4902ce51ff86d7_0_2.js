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
			this.createHead();
				// Style the document body
			Ext.get(this.document.body).addClass('htmlarea-content-body');
				// Start listening to things happening in the iframe
				// For some unknown reason, this is too early for Opera
			if (!Ext.isOpera) {
				this.startListening();
			}
				// Hide the iframe
			this.hide();
				// Set iframe ready
			this.ready = true;
			this.fireEvent('HTMLAreaEventIframeReady');
		}
	}