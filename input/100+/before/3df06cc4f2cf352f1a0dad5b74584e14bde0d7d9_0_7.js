function( error, notificationListeners ){
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
	}