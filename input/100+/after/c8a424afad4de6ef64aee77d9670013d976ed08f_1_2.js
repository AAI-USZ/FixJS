function checkCSSFeature(name, prefixStyle) {
		// Modified from https://developer.mozilla.org/en/CSS/CSS_animations/Detecting_CSS_animation_support
		var styleString = name,
			prefixedString = prefixStyle || (styleString && styleString.length > 0 ? styleString.charAt(0) + styleString.substr(1,styleString.length - 1) : ''),
			elm = document.createElement('div');
			
		if( elm.style[styleString] ) return true;

		for( var i = 0; i < domPrefixes.length; i++ ) {
			if( elm.style[ domPrefixes[i] + prefixedString ] !== undefined ) {
				return domPrefixes[i];
			}
		}
		return false;
	}