function(args, callback ) {
	if ( args === null || args === undefined){
		callback("args is null", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('user') &&
	                             args.hasOwnProperty('app'));
		
	if ( !containsAllProperties ){
		callback("Invalid args ", null );
		return;	
	}
	
	var arg = new Object();
	arg.user = args.user;
	arg.app  = args.app;
	
	UserNotificationSettings.find({where : arg 
	}).success(function(notificationSettings ){
    	callback( null, notificationSettings );
    }).error(function(error){
    	callback( error, null );
    });
}