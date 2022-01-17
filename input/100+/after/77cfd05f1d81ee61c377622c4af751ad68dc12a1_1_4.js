function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('user') && args.hasOwnProperty('target') &&
		args.hasOwnProperty('event') && args.hasOwnProperty('app'));
		
	if (!containsAllProperties ){
		callback("Invalid args ", null );
		return;
		
	}
	NotificationListener.find( { where : { user : args.user,
								   target : args.target,
								   event : args.event,
								   app    : args.app }
	}).success( function(notification) {
		callback(null, notification);
	}).error(function(error){
		callback(error, null);
	});
}