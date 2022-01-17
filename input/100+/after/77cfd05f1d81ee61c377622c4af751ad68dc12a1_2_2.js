function(args, callback){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('wait'));
		                            
	if ( !containsAllProperties ){
		callback("Invalid args ", null );
		return;
	}
	UserNotification.findAll({where : { wait: args.wait, emailSent: false }}).success(function( notifications){
		callback(null,notifications);
	}).error(function(error){
		callback( error, null);
	});
}