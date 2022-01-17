function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('app') &&
	                              args.hasOwnProperty('user'));
		                            
	if ( !containsAllProperties ){
		callback("Invalid args ", null );
		return;
	}
	
	var arg = new Object();
	arg.app = args.app;
	arg.user = args.user;
	
	UserNotification.selectUserNotificationsForUserOnApp( arg , function( error, notifcations ){
		if ( error ){
			callback( error , null );
		}
		else {
			callback( null, notifications );
		}
	});
}