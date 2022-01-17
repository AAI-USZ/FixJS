function( args, callback ) {
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('user') &&
		                         args.hasOwnProperty('app') &&
		                        args.hasOwnProperty('target'));
		                            
	if (  !containsAllProperties ){
		callback("Invalid args ", null );
		return;
	}
	
	var arg = new Object();
	arg.user = args.user;
	arg.app  = args.app;
	arg.target = args.target;
	
	NotificationListener.findAllNotificationListenersByTarget( arg, function( error, listeners ){
		if( listeners != null ){
			var listenerArray = new Array();
			var i = listeners.length - 1;
			for ( ; i >= 0 ; i--){
				listenerArray.push( listeners[i].uuid );
			}
			var listeners = new Object();
			listeners.uuids = listenerArray; 
			
			UserNotification.findUserNotificationsByListenerUUID( listeners, function( error, usernotifications ){
			
				if ( error ){
					callback ( error, null );
				}
				else {
					var notifications = new Object();
					notifications.usernotifications = usernotifications;
					
					UserNotification.removeUserNotifications( notifications, function( error, removedNotifications ){
						if ( error ){
							callback( error , null );
						}
						else {
							callback( null, removedNotifications );
						}
					});
				}
			});
		} else {
			callback( null, new Array() );
		}
	});
}