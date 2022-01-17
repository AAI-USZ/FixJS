function( error, notificationListener ){
		if ( error ){
			callback( error, null );
			return;
		}
		if ( null === notificationListener ){
			callback( " No notification listener found ", null );
			return;
		}
		args.notificationlistener = notificationListener;
		NotificationListener.removeNotificationListener( args, function( error, removedListener ){
			if ( error ){
				callback( error, null );
				return;
			}
			if (  null === removedListener ) {
				callback( "No listener was removed", null );
				return;
			}
			args.listener = args.notificationlistener.listener;
			UserNotification.selectUserNotifications( args, function( error, userNotifications ){
				if ( error ){
					callback( error, null );
					return;
				}
				if ( 0 === userNotifications.length ){
					callback( "No user notifications were found matching your parameters", null );
					return;
				}
				args.usernotifications = userNotifications;
				UserNotification.removeUserNotifications( args, function( error, removedUserNotifications){
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