function () {
		var stylesAreLoaded = true;
		var errorText = '';
		var rules;
		if (Ext.isOpera) {
			if (this.document.readyState != 'complete') {
				stylesAreLoaded = false;
				errorText = 'Document.readyState not complete';
			}
		} else {
				// Test if the styleSheets array is at all accessible
			if (Ext.isIE) {
				try {
					var rules = this.document.styleSheets[0].rules;
					var imports = this.document.styleSheets[0].imports;
					if (!rules.length && !imports.length) {
						stylesAreLoaded = false;
						errorText = 'Empty rules and imports arrays';
					}
				} catch(e) {
					stylesAreLoaded = false;
					errorText = e;
				}
			} else {
				try {
					this.document.styleSheets && this.document.styleSheets[0] && this.document.styleSheets[0].rules;
				} catch(e) {
					stylesAreLoaded = false;
					errorText = e;
				}
			}
				// Then test if all stylesheets are accessible
			if (stylesAreLoaded) {
					// Expecting 3 stylesheets...
				if (this.document.styleSheets.length > 2) {
					Ext.each(this.document.styleSheets, function (styleSheet, index) {
						if (Ext.isIE) {
							try { 
								var rules = styleSheet.rules;
								var imports = styleSheet.imports;
									// Default page style may contain only a comment
								if (!rules.length && !imports.length && index != 1) {
									stylesAreLoaded = false;
									errorText = 'Empty rules and imports arrays of styleSheets[' + index + ']';
									return false;
								}
							} catch(e) {
								stylesAreLoaded = false;
								errorText = e;
								return false;
							}
						} else {
							try {
								var rules = styleSheet.cssRules;
							} catch(e) {
								stylesAreLoaded = false;
								errorText = e;
								return false;
							}
						}
					});
				} else {
					stylesAreLoaded = false;
					errorText = 'Empty stylesheets array or missing linked stylesheets';
				}
			}
		}
		if (!stylesAreLoaded) {
			this.getStyleSheets.defer(100, this);
			HTMLArea._appendToLog('[HTMLArea.Iframe::getStyleSheets]: Stylesheets not yet loaded (' + errorText + '). Retrying...');
			if (/Security/i.test(errorText)) {
				HTMLArea._appendToLog('ERROR [HTMLArea.Iframe::getStyleSheets]: A security error occurred. Make sure all stylesheets are accessed from the same domain/subdomain and using the same protocol as the current script.');
			}
		} else {
			HTMLArea._appendToLog('[HTMLArea.Iframe::getStyleSheets]: Stylesheets successfully accessed.');
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