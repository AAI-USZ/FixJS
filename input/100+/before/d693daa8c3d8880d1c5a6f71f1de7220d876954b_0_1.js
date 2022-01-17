function (cssRules) {
		for (var rule = 0; rule < cssRules.length; rule++) {
				// Style rule
			if (cssRules[rule].selectorText) {
				this.parseSelectorText(cssRules[rule].selectorText);
			} else {
					// Import rule
				if (cssRules[rule].styleSheet) {
					this.parseRules(cssRules[rule].styleSheet.cssRules);
				}
					// Media rule
				if (cssRules[rule].cssRules) {
					this.parseRules(cssRules[rule].cssRules);
				}
			}
		}
	}