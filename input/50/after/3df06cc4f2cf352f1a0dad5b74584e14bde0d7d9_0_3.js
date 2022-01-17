function( error, removedNotifications ){
						if ( error ){
							console.log("[UserNotification.removedUserNotifications] error - "+error);
							callback( null, new Array());
						}
						else {
							callback( null, removedNotifications );
						}
					}