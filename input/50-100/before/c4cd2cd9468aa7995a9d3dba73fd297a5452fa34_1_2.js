function() {
	/*
	 * For CSS Gradients syntax, please see:
	 * http://webkit.org/blog/175/introducing-css-gradients/
	 * https://developer.mozilla.org/en/CSS/-moz-linear-gradient
	 * https://developer.mozilla.org/en/CSS/-moz-radial-gradient
	 * http://dev.w3.org/csswg/css3-images/#gradients-
	 */

	/** @type {string} */
	var str1 = 'background-image:';
	/** @type {string} */
	var str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));';
	/** @type {string} */
	var str3 = 'linear-gradient(left top,#9f9, white);';

	this._mStyle.cssText = (str1 + npf.userAgent.Support.prefixes.join(str2 + str1) + npf.userAgent.Support.prefixes.join(str3 + str1)).slice(0, -str1.length);

	return this._contains(this._mStyle.backgroundImage, 'gradient');
}