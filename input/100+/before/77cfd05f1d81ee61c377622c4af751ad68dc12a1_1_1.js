function( args, callback){
	args.uuid = UUID.generate();
	var newNotification = NotificationListener.build(args);
	newNotification.save().error(function(error){
		callback( error, null );
	}).success(function( newNotificationListener ){
		callback( null, newNotificationListener );
	});
}