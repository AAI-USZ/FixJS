function( error, usernotifications ){
			
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
			}