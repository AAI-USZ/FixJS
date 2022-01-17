function (styleSheet, index) {
						if (HTMLArea.isIEBeforeIE9) {
							try { 
								var rules = styleSheet.rules;
								var imports = styleSheet.imports;
									// Default page style may contain only a comment
								if (!rules.length && !imports.length && styleSheet.href.indexOf('defaultPageStyle') === -1) {
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