function (styleSheet, index) {
					try {
						if (HTMLArea.isIEBeforeIE9) {
							var rules = styleSheet.rules;
							var imports = styleSheet.imports;
							if (!rules.length && !imports.length) {
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
				}