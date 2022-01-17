function( args, callback){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
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
		callback("Invalid args ", null );
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
			callback( error, null);
			return;
		}
		if ( null === setting ){
			callback("No setting found to return", null);
			return;
		}
		arg.usernotificationsettings = setting;
		UserNotificationSettings.updateUserNotificationSettings(arg, function( error, updatedSettings ){
			if ( error ){
				callback( error, null );
			} else {
				callback( null, updatedSettings );
			}
		});
	});
}