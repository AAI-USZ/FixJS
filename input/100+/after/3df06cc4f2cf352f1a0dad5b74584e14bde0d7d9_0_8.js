function( args, callback ){
	if ( args === null || args === undefined ){
		console.log("[NotificationAction.removeUserNotificationsByUser] error - Args is not existent" );
		callback( null, new Array());
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('user') &&
		                         args.hasOwnProperty('app'));
		                            
	if (  !containsAllProperties ){
		console.log("[NotificationAction.removeUserNotificationsByUser] error - Invalid args");
		callback( null, new Array());
		return;
	}
	
	var arg = new Object();
	arg.user = args.user;
	arg.app  = args.app;
	
	NotificationListener.findUserSpecificNotificationListeners( arg, function( error, notificationListeners ){
		if ( error ){
			console.log("[NotificationListener.findUserSpecificNotificationListeners] error - " + error );
			callback( null, new Array());
		}
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
					console.log("[UserNotification.findUserNotificationsByListenerUUID] error - " + error );
					callback( null, new Array());
				}
				else {
					var notifications = new Object();
					notifications.usernotifications = usernotifications;
					
					UserNotification.removeUserNotifications( notifications, function( error, removedNotifications ){
						if ( error ){
							console.log("[UserNotification.removeUserNotifications] error - " + error );
							callback( null, new Array());
						}
						else {
							callback( null, removedNotifications );
						}
					});
				}
			});
		}
	});
}