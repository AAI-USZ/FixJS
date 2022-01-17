function getAttrs(element) {
		var attrs = element.attributes;
		var cleanAttrs = [];
		for ( var i = 0; i < attrs.length; i++ ) {
			var attr = attrs[ i ];
			if ( typeof attr.specified === "undefined" || attr.specified ) {
				var name = attr.nodeName;
				// Use jQuery to get a corrected style attribute on IE.
				// Otherwise prefer getAttribute() over attr.nodeValue as the
				// latter stringifies the attribute value.
				// There seems to be a jQuery bug that returns undefined
				// for the "checked" attribute on IE7, otherwise we
				// could always use jquery.
				var value = ( "style" === name ? $.attr(element, name) : attr.nodeValue );
				cleanAttrs.push( [ name, value ] );
			}
		}
		return cleanAttrs;
	}