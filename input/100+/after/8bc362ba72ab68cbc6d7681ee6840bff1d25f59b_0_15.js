function () {
		this.cssLoaded = true;
		this.error = null;
			// Test if the styleSheets array is at all accessible
		if (Ext.isOpera) {
			if (this.editor.document.readyState !== 'complete') {
				this.cssLoaded = false;
				this.error = 'Document.readyState not complete';
			}
		} else {
			if (HTMLArea.isIEBeforeIE9) {
				try {
					var rules = this.editor.document.styleSheets[0].rules;
					var imports = this.editor.document.styleSheets[0].imports;
					if (!rules.length && !imports.length && index != 1 && typeof(document.documentMode) === 'undefined') {
						this.cssLoaded = false;
						this.error = 'Empty rules and imports arrays';
					}
				} catch(e) {
					this.cssLoaded = false;
					this.error = e;
				}
			} else {
				try {
					this.editor.document.styleSheets && this.editor.document.styleSheets[0] && this.editor.document.styleSheets[0].rules;
				} catch(e) {
					this.cssLoaded = false;
					this.error = e;
				}
			}
		}
		if (this.cssLoaded) {
				// Expecting 3 stylesheets...
			if (this.editor.document.styleSheets.length > 2) {
				Ext.each(this.editor.document.styleSheets, function (styleSheet, index) {
					try {
						if (HTMLArea.isIEBeforeIE9) {
							var rules = styleSheet.rules;
							var imports = styleSheet.imports;
								// Default page style may contain only a comment
							if (!rules.length && !imports.length && index != 1 && typeof(document.documentMode) === 'undefined') {
								this.cssLoaded = false;
								this.error = 'Empty rules and imports arrays of styleSheets[' + index + ']';
								return false;
							}
							if (styleSheet.imports) {
								this.parseIeRules(styleSheet.imports);
							}
							if (styleSheet.rules) {
								this.parseRules(styleSheet.rules);
							}
						} else {
							this.parseRules(styleSheet.cssRules);
						}
					} catch (e) {
						this.error = e;
						this.cssLoaded = false;
						this.parsedClasses = {};
						return false;
					}
				}, this);
			} else {
				this.cssLoaded = false;
				this.error = 'Empty stylesheets array or missing linked stylesheets';
			}
		}
	}