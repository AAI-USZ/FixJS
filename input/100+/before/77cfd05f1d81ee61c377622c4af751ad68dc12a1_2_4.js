function( args, callback) {
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