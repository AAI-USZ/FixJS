function( error, listeners ){
		if ( error ){
			console.log("[NotificationListener.findAllNotificationListenersByTarget] error - "+ error );
			callback(null, new Array());
			return;
		}
		else if( listeners != null ){
			var listenerArray = new Array();
			var i = listeners.length - 1;
			for ( ; i >= 0 ; i--){
				listenerArray.push( listeners[i].uuid );
			}
			var listeners = new Object();
			listeners.uuids = listenerArray; 
			
			UserNotification.findUserNotificationsByListenerUUID( listeners, function( error, usernotifications ){
			
				if ( error ){
					console.log("[UserNotification.findUserNotificationsByListenerUUID] error - "+error);
					callback( null, new Array());
					return;
				} else {
					var notifications = new Object();
					notifications.usernotifications = usernotifications;
					
					UserNotification.removeUserNotifications( notifications, function( error, removedNotifications ){
						if ( error ){
							console.log("[UserNotification.removedUserNotifications] error - "+error);
							callback( null, new Array());
						}
						else {
							callback( null, removedNotifications );
						}
					});
				}
			});
		} else {
			console.log("[NotificationListener.findAllNotificationListenersByTarget] error - listeners was null");
			callback( null, new Array() );
		}
	}