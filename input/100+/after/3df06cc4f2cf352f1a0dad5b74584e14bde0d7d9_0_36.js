function( args, callback){
	if ( args === null || args === undefined ){
		console.log("[UserNotificationSettings.createUserNotificationSettings] error - Args is not existent");
		callback( null, new Object());		
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('app') &&
	                              args.hasOwnProperty('user'));
		                            
	if ( !containsAllProperties ){
		console.log("[UserNotificationSettings.createUserNotificationSettings] error - Invalid args");
		callback( null, new Object());	
		return;
	}
	
	var arg = new Object();
	arg.app = args.app;
	arg.user = args.user;
	
	UserNotificationSettings.addNotificationSetting( arg, function( error, newSettings ){
		if( error){
			console.log("[UserNotificationSettings.addNotificationSetting] error - "+error);
			callback( null, new Object());
		}
		else {
			callback(null, newSettings);
		}
	});
}