function(css) {
		new Ajax.Request(css, { method: 'get', asynchronous: false, onComplete: AjaxOnDemand.loadedCSS });
	}