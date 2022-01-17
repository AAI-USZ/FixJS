function(error, listener){
		if ( error ){
			callback( error, null );
			return;
		}
		if ( null === listener ){
			NotificationListener.createNotificationListener(arg, function(error, newListener){
				if ( error ){
					callback(error, null );
					return;
				}
				if ( null == newListener ){
					callback( "No new listener was created", null);
					return;
				}

				callback( null, newListener );
			});
		} else {
			callback( null, listener );
		}
	}