function(){
	/* Create our stylesheet object */
	var styleElement = document.createElement('style');
	document.body.appendChild( styleElement );
	var style = document.styleSheets[document.styleSheets.length-1];

	/* These are the css properties we want to adjust */
	var colorProperties = [
		"backgroundColor",
		"borderBottomColor",
		"borderLeftColor",
		"borderRightColor",
		"borderTopColor",
		"color",
		"outlineColor",
		"textUnderlineColor"
	];
	/* These are the css names for the above properties */
	var cssPropertyNames = {
		"backgroundColor": "background-color",
		"borderBottomColor": "border-bottom-color",
		"borderLeftColor": "border-left-color",
		"borderRightColor": "border-right-color",
		"borderTopColor": "border-top-color",
		"color": "color",
		"outlineColor": "outline-color",
		"textUnderlineColor": "text-underline-color"
	};

	/* Iterate through document stylesheets */
	var ss = document.styleSheets,
		i =0,
		j = 0,
		k = 0;
	for (i=0; i<(ss.length-1); i++) {
		console.log(i, ss[i].href);

		// If there are no style rules, skip this sheet
		if (!ss[i].cssRules) {
			console.log("No rules.");
			continue;
		}

		/* Iterate through style rules */
		for (j=0; j<ss[i].cssRules.length; j++) {
			var rule = ss[i].cssRules[j];

			var toAdd = {},
				toAddLength = 0;

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
						var val = toAdd[prop],
							propName = cssPropertyNames[prop];
						declaration += propName + ": " + val + "; ";
					}
				declaration += " } \n";
				/*style.insertRule(declaration, style.cssRules.length);*/
				styleElement.innerHTML += declaration;
			}
		}
	}
}