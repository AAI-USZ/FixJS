function (selector) {

		if (this.screenStyleSheet) {

			var selectors, i;

			selectors = selector.split(','); /* multiple selectors supported, no need for multiple calls to this anymore */

			for (i=0; i<selectors.length; i++) {

				this.screenStyleSheet.addRule(selectors[i], 'behavior:expression(DD_belatedPNG.fixPng(this))'); /* seems to execute the function without adding it to the stylesheet - interesting... */

			}

		}

	}