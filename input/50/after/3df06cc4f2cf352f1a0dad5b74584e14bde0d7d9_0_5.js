function( error, removedUserNotifications){
					if ( error ){
						console.log("[NotificationListener.removeUserNotifications] error - "+error);
						callback( null, new Array());
						return;
					}else {
						callback( null, removedUserNotifications);
					}
				}