function( args, callback ){
	NotificationListener.findAll({where : { app : args.app,
	                                        target : args.target,
	                                        event : args.event}
	}).success( function(notifications ){
		callback( null, notifications )
	}).error( function ( error ){
		callback( error, null );
	});
}