function( error, removedNotifications ){
						if ( error ){
							console.log("[UserNotification.removeUserNotifications] error - " + error );
							callback( null, new Array());
						}
						else {
							callback( null, removedNotifications );
						}
					}