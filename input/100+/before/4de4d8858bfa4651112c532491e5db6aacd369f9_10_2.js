function (option) {
				var selector = 'body.htmlarea-show-language-marks *[' + 'lang="' + option.get('value') + '"]:before';
				var style = 'content: "' + option.get('value') + ': ";';
				var rule = selector + ' { ' + style + ' }';
				if (!Ext.isIE) {
					try {
						styleSheet.insertRule(rule, styleSheet.cssRules.length);
					} catch (e) {
						this.appendToLog('onGenerate', 'Error inserting css rule: ' + rule + ' Error text: ' + e, 'warn');
					}
				} else {
					styleSheet.addRule(selector, style);
				}
				return true;
			}