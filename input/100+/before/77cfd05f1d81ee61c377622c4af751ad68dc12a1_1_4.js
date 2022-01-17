function( args, callback ){
	NotificationListener.find( { where : { user : args.user,
								   target : args.target,
								   event : args.event }
	}).success( function(notification) {
		callback(null, notification);
	}).error(function(error){
		callback(error, null);
	});
}