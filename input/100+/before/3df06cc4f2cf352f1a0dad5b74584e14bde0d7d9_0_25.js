function( error, starListener){
				notificationArray.push( starListener );
				if ( notificationArray.length == 3 ){
					callback( null, notificationArray );
				} else {
					callback( error, null );
				}
			}