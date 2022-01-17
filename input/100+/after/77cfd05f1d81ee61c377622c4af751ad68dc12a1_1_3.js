function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('app') && args.hasOwnProperty('target') &&
		args.hasOwnProperty('event') );
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;
		
	}
	
	NotificationListener.findAll({where : { app : args.app,
	                                        target : args.target,
	                                        event : args.event}
	}).success( function(notifications ){
		callback( null, notifications )
	}).error( function ( error ){
		callback( error, null );
	});
}