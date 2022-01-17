function( error, removedNotifications ){
						if ( error ){
							callback( error , null );
						}
						else {
							callback( null, removedNotifications );
						}
					}