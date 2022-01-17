function( error, removedListener ){
			if ( error ){
				callback( error, null );
				return;
			}
			if (  null === removedListener ) {
				console.log("[NotificationListener.findNotificationListener] error - no listener was removed");
				callback( null, new Array());
				return;
			}
			arg.listener = arg.notificationlistener.uuid;
			UserNotification.selectUserNotifications( arg, function( error, userNotifications ){
				if ( error ){
					console.log("[NotificationListener.selectUserNotifications] error - "+error);
					callback( null, new Array());
					return;
				}
				if ( 0 === userNotifications.length ){
					console.log("[NotificationListener.findNotificationListener] error - no user notifications were found matching your parameters");
					callback( null, new Array());
					return;
				}
				arg.usernotifications = userNotifications;
				UserNotification.removeUserNotifications( arg, function( error, removedUserNotifications){
					if ( error ){
						console.log("[NotificationListener.removeUserNotifications] error - "+error);
						callback( null, new Array());
						return;
					}else {
						callback( null, removedUserNotifications);
					}
				});
			});
		}