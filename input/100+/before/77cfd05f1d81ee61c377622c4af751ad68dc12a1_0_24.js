function( error, notifcations ){
		if ( error ){
			callback( error , null );
		}
		else {
			callback( null, notifications );
		}
	}