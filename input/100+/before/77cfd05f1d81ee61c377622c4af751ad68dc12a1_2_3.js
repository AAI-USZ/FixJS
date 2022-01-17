function( args, callback ){
	var arr = new Array();
	async.forEachSeries( args.usernotifications, function( notification, callback ){
		notification.updateAttributes({ emailSent : true }).error(function(error){
			callback(error);
		}).success(function(updatedAttribute){
			arr.push(updatedAttribute);
			callback();
		})
	}, function ( err ){
		if ( err ){
			callback ( err, null );
		}
		else {
			callback( null, arr );
		}
	});
}