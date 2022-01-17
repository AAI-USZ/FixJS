function( args, callback){
	if ( args === null || args === undefined ){
		console.log("[NotificationAction.addNotifier] error - Args is not existent");
		callback( null, new Object());
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('user') &&
	                              args.hasOwnProperty('target') &&
		                               args.hasOwnProperty('event') &&
		                               args.hasOwnProperty('app'));
		                            
	if (!containsAllProperties ){
		console.log("[NotificationAction.addNotifier] error - Invalid args");
		callback( null, new Object());
		return;
	}
	
	var arg    = new Object();
	arg.user   = args.user;
	arg.target = args.target;
	arg.event  = args.event;
	arg.app    = args.app;

	NotificationListener.findNotificationListener( arg, function(error, listener){
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
	});
}