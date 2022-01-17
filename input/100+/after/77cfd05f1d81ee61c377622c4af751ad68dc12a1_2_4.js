function( args, callback) {
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('usernotifications'));
		                            
	if ( !containsAllProperties ){
		callback("Invalid args ", null );
		return;
	}
	
	var arr = new Array();
	async.forEachSeries( args.usernotifications, function( userNotification, callback){
		userNotification.destroy().error(function(error){
			callback( error );
		}).success(function(){
			arr.push( userNotification );
			callback();
		});
			
	}, function(error){
		if ( error ){
			callback( error, null );
		} else {
			callback( null, arr );
		}
	});
}