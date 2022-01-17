function(args, callback){
	var containsAllProperties = (args.hasOwnProperty('usernotificationsettings') &&
	                              args.hasOwnProperty('notificationOnNewResource') &&
		                               args.hasOwnProperty('notificationOnLike') &&
		                           args.hasOwnProperty('notificationOnComment')  &&
		                            args.hasOwnProperty('notificationOnStar'));
		
	if ( args === null || !containsAllProperties ){
		callback("Invalid args ", null );
		return;
	}
	
	args.usernotificationsettings.updateAttributes({
		notificationOnNewResource : args.notificationOnNewResource,
		notificationOnLike        : args.notificationOnLike,
		notificationOnComment     : args.notificationOnComment,
		notificationOnStar        : args.notificationOnStar
	}).success(function(updatedSettings){
		callback( null, updatedSettings );
	}).error(function( error ){
		callback( error, null );
	});
}