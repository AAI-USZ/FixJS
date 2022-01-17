function() {
	/** @type {boolean} */
	var isPropertySupported;

	if (('ontouchstart' in window) || window['DocumentTouch'] && document instanceof window['DocumentTouch']) {
		isPropertySupported = true;
	} else {
		/** @type {string} */
		var id = 'testTouch';
		/** @type {string} */
		var style = ['@media (', npf.userAgent.Support.prefixes.join('touch-enabled),('), npf.userAgent.Support.MOD, ')', '{#', id, '{top:9px;position:absolute}}'].join('');

		this._testStyles(style, function(node, rule) {
			// IE8 will bork if you create a custom build that excludes both fontface and generatedcontent tests.
			// So we check for cssRules and that there is a rule available
			// More here: https://github.com/Modernizr/Modernizr/issues/288 & https://github.com/Modernizr/Modernizr/issues/293
			isPropertySupported = node.childNodes[0].offsetTop === 9;
		}, id);
	}

	return isPropertySupported;
}