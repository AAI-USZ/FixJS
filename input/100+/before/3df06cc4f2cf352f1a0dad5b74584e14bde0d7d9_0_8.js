function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('user') &&
		                         args.hasOwnProperty('app'));
		                            
	if (  !containsAllProperties ){
		callback("Invalid args ", null );
		return;
	}
	
	var arg = new Object();
	arg.user = args.user;
	arg.app  = args.app;
	
	NotificationListener.findUserSpecificNotificationListeners( arg, function( error, notificationListeners ){
		if ( null != notificationListeners ){
			var i = notificationListeners.length - 1;
			var arr = new Array();
			for (; i>=0; i-- ){
				arr.push( notificationListeners[i].uuid );
			}	
			
			var listeners = new Object();
			listeners.uuids = arr;
			
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