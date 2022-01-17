function(args, callback){
	//console.log( args.
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