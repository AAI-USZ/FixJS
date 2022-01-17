function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('usernotifications'));
		                            
	if (  !containsAllProperties ){
		callback("Invalid args ", null );
		return;
	}
	
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