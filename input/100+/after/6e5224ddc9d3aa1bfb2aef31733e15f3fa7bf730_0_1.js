function(cssRulesList) {
		/* Iterate through style rules */
		for (j=0; j<cssRulesList.length; j++) {
			var rule = cssRulesList[j],
				toAdd = {},
				toAddLength = 0;

			/* If rule is a CSSMediaRule, we need to get its innards. */
			if (rule.constructor.name == "CSSMediaRule") {
				console.log("Recursing");
				//handleRules(rule.cssRules);
				// FIXME: Currently goes into an infinite loop if it recurses for @media rules.
				continue;
			}

			/* For each of the 'colorProperties', see if it's here */
			for (k=0; k<colorProperties.length; k++) {
				if (rule.style[colorProperties[k]] !== "") {
					// Add this rule to the thing!
					toAdd[colorProperties[k]] = rule.style[colorProperties[k]];
					toAddLength++;
				}
			}

			/* If any of the declarations were relevant, adjust them and add them to our style object */
			if (toAddLength) {
				var selector = rule.selectorText;
				var declaration = selector + " { ";
					for (var prop in toAdd) {
						var val = desaturate(toAdd[prop], regexes),
							propName = cssPropertyNames[prop];
						declaration += propName + ": " + val + "; ";
					}
				declaration += " } \n";
				/*style.insertRule(declaration, style.cssRules.length);*/
				styleElement.innerHTML += declaration;
			}
		}
	}