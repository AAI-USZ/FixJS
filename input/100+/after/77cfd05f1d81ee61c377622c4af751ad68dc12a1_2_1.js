function(args, callback){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('listener'));
		                            
	if (!containsAllProperties || args.listener === null){
		callback("Invalid args ", null );
		return;
	}
	
	UserNotification.findAll({ where : {listener : args.listener}
	}).success( function(notifications){
		callback( null, notifications );
	}).error(function(error){
		callback( error, null );
	});
}