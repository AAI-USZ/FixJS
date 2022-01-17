function( args, callback){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('user') && args.hasOwnProperty('target') &&
		args.hasOwnProperty('event') );
	if (  !containsAllProperties ){
		callback("Invalid args ", null );
		return;
		
	}
	
	var arg = new Object();
	arg.user   = args.user;
	arg.target = args.target;
	arg.event  = args.event;
	arg.app    = args.app;
	
	arg.uuid = UUID.generate();
	var newNotification = NotificationListener.build(arg);
	newNotification.save().error(function(error){
		callback( error, null );
	}).success(function( newNotificationListener ){
		callback( null, newNotificationListener );
	});
}