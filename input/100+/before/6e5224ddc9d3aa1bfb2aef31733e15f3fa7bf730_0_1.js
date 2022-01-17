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
		"outlineColor"
	];
	/* These are the css names for the above properties */
	var cssPropertyNames = {
		"backgroundColor": "background-color",
		"borderBottomColor": "border-bottom-color",
		"borderLeftColor": "border-left-color",
		"borderRightColor": "border-right-color",
		"borderTopColor": "border-top-color",
		"color": "color",
		"outlineColor": "outline-color"
	};

	var makeRegexes = function() {
		var hex = "[0-9a-f]",
			rgb = "(\\d|[1-9]\\d|[12]\\d\\d)",
			alpha = "[01]|0\\.\\d+";

		var regexes = {
			rgb: new RegExp("rgb\\(\\s*" + rgb + "\\s*,\\s*" + rgb + "\\s*,\\s*" + rgb + "\\s*\\)", "i" ),
			rgba: new RegExp("rgba\\(\\s*" + rgb + "\\s*,\\s*" + rgb + "\\s*,\\s*" + rgb + "\\s*,\\s*" + alpha + "\\s*\\)", "i" ),
			
		};

		return regexes;
	};
	var regexes = makeRegexes();

	/**
	 * Converts an RGB color value to HSL. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	 * Assumes r, g, and b are contained in the set [0, 255] and
	 * returns h, s, and l as expected for css.
	 *
	 * @param   Number  r       The red color value
	 * @param   Number  g       The green color value
	 * @param   Number  b       The blue color value
	 * @param	Number	a 		The alpha value. Not used in calculation, just returned in result.
	 * @return  Array           The HSL representation
	 */
	var rgbToHsl = function(r, g, b, a){
	    r /= 255, g /= 255, b /= 255;
	    var max = Math.max(r, g, b), min = Math.min(r, g, b);
	    var h, s, l = (max + min) / 2;

	    if(max == min){
	        h = s = 0; // achromatic
	    }else{
	        var d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        switch(max){
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }
	        h /= 6;
	    }

	    h *= 360;
	    s *= 100;
	    l *= 100;
	    return [h, s, l, a];
	};

	/**
	 * Convert color to HSL, with a saturation of 0%
	 */
	var desaturate = function(color, regexes) {
		var hsla = [];

		/* Figure-out what kind of color this is */
		if (regexes.rgb.test(color)) {
			/* rgb(255, 255, 255) */
			var rgb = regexes.rgb.exec(color);
			hsla = rgbToHsl(rgb[1], rgb[2], rgb[3], 1);
			console.log("rgb", rgb, hsla);
		} else if (regexes.rgba.test(color)) {
			/* rgba(255, 255, 255, 0.5) */
			var rgba = regexes.rgba.exec(color);
			hsla = rgbToHsl(rgba[1], rgba[2], rgba[3], rgba[4]);
			console.log("rgba", rgba, hsla);
		}

		hsla[1] = 0; // Desaturate

		return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + hsla[3] + ")";
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
}