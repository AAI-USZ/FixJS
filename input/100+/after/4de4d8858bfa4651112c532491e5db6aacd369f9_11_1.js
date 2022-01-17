function (option) {
			var selector = 'body.htmlarea-show-microdata *[' + store.storeId + '="' + option.get('name') + '"]:before';
			var style = 'content: "' + option.get('label') + ': "; font-variant: small-caps;';
			var rule = selector + ' { ' + style + ' }';
			if (!HTMLArea.isIEBeforeIE9) {
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