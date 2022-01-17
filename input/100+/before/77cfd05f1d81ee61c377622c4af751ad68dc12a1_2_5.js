function( args, callback ) {
	var userNotification = UserNotification.build(args);
	userNotification.save().error(function(error){
		callback( error, null );
	}).success(function(savedUserNotification){
		callback( null, savedUserNotification);
	});			
}