function() {
	/** @type {boolean} */
	var isPropertySupported = !!this._testProps(['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective']);

	// Webkits 3D transforms are passed off to the browser's own graphics renderer.
	//   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
	//   some conditions. As a result, Webkit typically recognizes the syntax but
	//   will sometimes throw a false positive, thus we must do a more thorough check:
	if (isPropertySupported && 'webkitPerspective' in document.documentElement.style) {
		// Webkit allows this media query to succeed only if the feature is enabled.
		// `@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d),(modernizr){ ... }`

		/** @type {string} */
		var id = 'testCssTransforms3d';
		/** @type {string} */
		var style = ['@media (', npf.userAgent.Support.prefixes.join('transform-3d),('), npf.userAgent.Support.MOD, ')', '{#', id, '{left:9px;position:absolute}}'].join('');

		this._testStyles(style, function(node, rule) {
			// IE8 will bork if you create a custom build that excludes both fontface and generatedcontent tests.
			// So we check for cssRules and that there is a rule available
			// More here: https://github.com/Modernizr/Modernizr/issues/288 & https://github.com/Modernizr/Modernizr/issues/293
			isPropertySupported = node.childNodes[0].offsetLeft === 9;
		}, id);
	}

	return isPropertySupported;
}