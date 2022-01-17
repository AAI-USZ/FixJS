function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('user') && args.hasOwnProperty('title') &&
		args.hasOwnProperty('path') && args.hasOwnProperty('type'));
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	MediaFile.createMediaFile(args, function(error, newMediaFile){		
		if (!error) {
			callback(null, newMediaFile);	
		}
		else {
			callback(error, null);
		}
		
	})	
}