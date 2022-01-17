function(args, callback){
	UserNotification.findAll({ where : {listener : args.listener}
	}).success( function(notifications){
		callback( null, notifications );
	}).error(function(error){
		callback( error, null );
	});
}