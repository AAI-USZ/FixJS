function( args, callback){

	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	
	var containsAllProperties = (args.hasOwnProperty('user') &&
	                              args.hasOwnProperty('target') &&
		                               args.hasOwnProperty('event') &&
		                               args.hasOwnProperty('app') &&
		                               args.hasOwnProperty('listener'));
		                            
	if ( !containsAllProperties ){
		callback("Invalid args ", null );
		return;
	}
	
	var arg = new Object();
	arg.user = args.user;
	arg.target = args.target;
	arg.event = args.event;
	arg.app = args.app;
	arg.listener = args.listener;
	
	NotificationListener.findNotificationListener( arg, function( error, notificationListener ){
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
	});
}