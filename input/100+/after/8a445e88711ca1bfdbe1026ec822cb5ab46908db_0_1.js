function( expr, context, isXML ) {
	var set;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var match,
			type = Expr.order[i];
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			var left = match[1];
			match.splice( 1, 1 );

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context, isXML );

				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		if ( typeof context.getElementsByTagName !== "undefined" ) {
			set = context.getElementsByTagName( "*" );

		// Handle Document Fragments that don't have gEBTN
		} else {
			set = [];

			// Should probably recurse through the whole fragment
			var cur = context.firstChild;

			while ( cur ) {
				set.push( cur );
				cur = cur.nextSibling;
			}
		}
	}

	return { set: set, expr: expr };
}