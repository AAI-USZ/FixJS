function( args, callback){

	var containsAllProperties = (args.hasOwnProperty('user') && args.hasOwnProperty('app'));
		
	if ( args === null || !containsAllProperties ){
		callback("Invalid args ", null );
		return;
		
	}
	
	var arg = new Object();
	arg.user = args.user;
	arg.app  = args.app;
	
	// we want to check if we can see see this setting, if it doesnt exist then we will
	// create a new user notification setting for this app
	
	this.findNotificationSettings( arg, function( error, notificationSettings ){
		if ( null === notificationSettings ){
			var newSettings = UserNotificationSettings.build(arg);
			newSettings.save().error(function(error){
				callback( error, null);
			}).success(function( setting ){
				callback(null, setting );
			});
		}
	});
}