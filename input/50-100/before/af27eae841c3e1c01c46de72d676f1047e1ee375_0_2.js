function( params ) {
		params = extend( extend( {}, QUnit.urlParams ), params );
		var querystring = "?",
			key;
		for ( key in params ) {
			if ( !hasOwn.call( params, key ) ) {
				continue;
			}
			querystring += encodeURIComponent( key ) + "=" +
				encodeURIComponent( params[ key ] ) + "&";
		}
		return window.location.pathname + querystring.slice( 0, -1 );
	}