function( args, callback){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('user') &&
	                              args.hasOwnProperty('target') &&
		                               args.hasOwnProperty('event') &&
		                               args.hasOwnProperty('app'));
		                            
	if (!containsAllProperties ){
		callback("Invalid args ", null );
		return;
	}
	
	var arg = new Object();
	arg.user = args.user;
	arg.target = args.target;
	arg.event  = args.event;
	arg.app    = args.app;
	
	NotificationListener.findNotificationListener( arg, function(error, listener){
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
			callback( "This specific listener already exists" , null );
		}
	});
}