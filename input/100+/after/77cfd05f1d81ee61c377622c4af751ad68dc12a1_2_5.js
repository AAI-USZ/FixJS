function( args, callback ) {
	
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('listener') &&
	                              args.hasOwnProperty('description') &&
		                               args.hasOwnProperty('emailSent') &&
		                           args.hasOwnProperty('wait'));
		                            
	if ( !containsAllProperties ){
		callback("Invalid args ", null );
		return;
	}
	
	var arg = new Object();
	
	arg.listener    = args.listener;
	arg.description = args.description;
	arg.emailSent   = args.emailSent;
	arg.wait        = args.wait;
	
	var userNotification = UserNotification.build( arg );
	userNotification.save().error(function(error){
		callback( error, null );
	}).success(function(savedUserNotification){
		callback( null, savedUserNotification);
	});			
}