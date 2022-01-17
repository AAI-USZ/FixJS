function( elem, name ) {
		var ret, width,
			computed = getComputedStyle( elem, null ),
			style = elem.style;

		if ( computed ) {

			ret = computed[ name ];
			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// WebKit uses "computed value (percentage if specified)" instead of "used value" for margins
			// which is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !jQuery.support.pixelMargin && rmargin.test( name ) && rnumnonpx.test( ret ) ) {
				width = style.width;
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;
				style.minWidth = style.maxWidth = style.width = width;
			}
		}

		return ret;
	}