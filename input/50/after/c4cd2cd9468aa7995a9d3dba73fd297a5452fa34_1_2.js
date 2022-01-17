function(node, rule) {
			// IE8 will bork if you create a custom build that excludes both fontface and generatedcontent tests.
			// So we check for cssRules and that there is a rule available
			// More here: https://github.com/Modernizr/Modernizr/issues/288 & https://github.com/Modernizr/Modernizr/issues/293
			isPropertySupported = node.childNodes[0].offsetLeft === 9 && node.childNodes[0].offsetHeight === 3;
		}