function( error, updatedSettings ){
			if ( error ){
				callback( error, null );
			} else {
				callback( null, updatedSettings );
			}
		}