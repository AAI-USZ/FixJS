function( elem ) {
				return pattern.test( elem.className || elem.getAttribute("class") || "" );
			}