function( args, callback ){ 

	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('user') &&
	                              args.hasOwnProperty('target') &&
		                               args.hasOwnProperty('event') &&
		                               args.hasOwnProperty('app'));
		                            
	if (  !containsAllProperties ){
		callback("Invalid args ", null );
		return;
	}
	
	var arg = new Object();
	arg.target = args.target;
	arg.event = args.event;
	arg.user = args.user;
	arg.app  = args.app;
	
	var removedUserNotifications = new Array();
	NotificationListener.findNotificationListener( arg, function(error, notificationListener ){
		if ( error ){
			callback( error, null );
			return;
		}
		if ( null === notificationListener.listener){
			callback( "No notification listener could be found", null );
			return;
		}
		arg.listener = notificationListener.uuid;
		UserNotification.selectUserNotifications( arg, function(error, userNotifications ){
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
	})
	
}