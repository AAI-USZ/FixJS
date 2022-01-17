function( elem, value ) {
		var propName, attrNames, name, l, isBool,
			i = 0;

		if ( value && elem.nodeType === 1 ) {

			if ( !jQuery.isXMLDoc( elem ) ) {
				value = value.toLowerCase();
			}

			attrNames = value.split( core_rspace );
			l = attrNames.length;

			for ( ; i < l; i++ ) {
				name = attrNames[ i ];

				if ( name ) {
					propName = jQuery.propFix[ name ] || name;
					isBool = rboolean.test( name );

					// See #9699 for explanation of this approach (setting first, then removal)
					// Do not do this for boolean attributes (see #10870)
					if ( !isBool ) {
						jQuery.attr( elem, name, "" );
					}
					elem.removeAttribute( getSetAttribute ? name : propName );

					// Set corresponding property to false for boolean attributes
					if ( isBool && propName in elem ) {
						elem[ propName ] = false;
					}
				}
			}
		}
	}