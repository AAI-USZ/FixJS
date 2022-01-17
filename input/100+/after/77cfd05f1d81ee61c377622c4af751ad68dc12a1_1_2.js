function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('notificationlistener'));
	if (!containsAllProperties || args.notificationlistener === null){
		callback("Invalid args ", null );
		return;
		
	}
	args.notificationlistener.destroy().success( function( removedElement ){
		callback(null, removedElement);
	}).error(function(error){
		callback(error, null);
	});
}