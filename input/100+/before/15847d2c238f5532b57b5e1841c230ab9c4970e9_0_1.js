function (styleSheet, index) {
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
					}