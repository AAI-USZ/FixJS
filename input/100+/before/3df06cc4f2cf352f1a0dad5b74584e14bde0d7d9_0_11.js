function( error, notificationListener ){
		if ( error ){
			callback( error, null );
			return;
		}
		if ( null === notificationListener ){
			callback( " No notification listener found ", null );
			return;
		}
		arg.notificationlistener = notificationListener;
		NotificationListener.removeNotificationListener( arg, function( error, removedListener ){
			if ( error ){
				callback( error, null );
				return;
			}
			if (  null === removedListener ) {
				callback( "No listener was removed", null );
				return;
			}
			arg.listener = arg.notificationlistener.uuid;
			UserNotification.selectUserNotifications( arg, function( error, userNotifications ){
				if ( error ){
					callback( error, null );
					return;
				}
				if ( 0 === userNotifications.length ){
					callback( "No user notifications were found matching your parameters", null );
					return;
				}
				arg.usernotifications = userNotifications;
				UserNotification.removeUserNotifications( arg, function( error, removedUserNotifications){
					if ( error ){
						callback( error, null );
						return;
					}else {
						callback( null, removedUserNotifications);
					}
				});
			});
		});
	}