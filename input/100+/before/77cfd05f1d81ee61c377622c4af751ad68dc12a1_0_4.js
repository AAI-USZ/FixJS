function(error, notificationListener ){
		if ( error ){
			callback( error, null );
			return;
		}
		if ( null === notificationListener.listener){
			callback( "No notification listener could be found", null );
			return;
		}
		args.listener = notificationListener.uuid;
		UserNotification.selectUserNotifications( args, function(error, userNotifications ){
			if ( error ){
				callback( error, null );
				return;
			}
			UserNotification.removeUserNotifications({ usernotifications : userNotifications }, function( err, results ){
				if ( err ){
			 		callback( err, null );
			 	}else {
			 		callback( null, results);
			 	}
			});
			callback( null, removedUserNotifications );
		});
	}