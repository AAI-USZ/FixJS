function( error, usernotifications ){
			
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
			}