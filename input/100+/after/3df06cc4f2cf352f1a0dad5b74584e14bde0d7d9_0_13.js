function(error, listener){
		if ( error ){
			console.log("[NotificationAction.findNotificationListener] error - "+error);
			callback( null , new Object() );
			return;
		}
		if ( null === listener ){
			NotificationListener.createNotificationListener(arg, function(error, newListener){
				if ( error ){
					console.log("[NotificationAction.createNotificationListener] error - "+error);
					callback( null , new Object() );
					return;
				}
				if ( null == newListener ){
					console.log("[NotificationAction.createNotificationListener] error - no listener created");
					callback( null, new Object());
					return;
				}
				// if we had o create a new listener
				callback( null, newListener );
			});
		} else {
		    // if a notification listener already exists which matches the one the user wanted to create
			callback( null, listener );
		}
	}