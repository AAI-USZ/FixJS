function( args, callback){
	if ( args === null || args === undefined ){
		console.log("[NotificationAction.updateUserNotificationSettings] error - Args is not existent");
		callback( null, new Object());
		return;
	}
	var containsAllProperties = (
								  args.hasOwnProperty('user') &&
								  args.hasOwnProperty('app') &&
	                              args.hasOwnProperty('notificationOnNewResource') &&
	                              args.hasOwnProperty('notificationOnLike') &&
	                              args.hasOwnProperty('notificationOnComment') &&
	                              args.hasOwnProperty('notificationOnStar') );               
	if ( !containsAllProperties ){
		console.log("[NotificationAction.updateUserNotificationSettings] error - Invalid args");
		callback( null, new Object());
		return;
	}
	
	var arg = new Object();
	arg.app                       = args.app;
	arg.user                      = args.user;
	arg.notificationOnNewResource = args.notificationOnNewResource;
	arg.notificationOnLike        = args.notificationOnLike;
	arg.notificationOnComment     = args.notificationOnComment;
	arg.notificationOnStar        = args.notificationOnStar;
	
	
	UserNotificationSettings.findNotificationSettings( arg, function( error , setting ){
		if ( error ){
			console.log("[NotificationAction.updateUserNotificationSettings] error - "+error);
			callback( null, new Object());
			return;
		}
		if ( null === setting ){
			console.log("[NotificationAction.updateUserNotificationSettings] error - No settings found");
			callback( null, new Object());
			return;
		}
		arg.usernotificationsettings = setting;
		UserNotificationSettings.updateUserNotificationSettings(arg, function( error, updatedSettings ){
			if ( error ){
				console.log("[UserNotificationSettings.updateUserNotificationSettings] error - "+error);
				callback( null, new Object());
			} else {
				callback( null, updatedSettings );
			}
		});
	});
}