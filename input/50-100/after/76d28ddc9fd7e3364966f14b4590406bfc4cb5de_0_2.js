function( args, callback ){ 
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = args.hasOwnProperty('user');
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	MediaFile.getMediaFileUser(args, function(error, mediaFileUser){		
		if (!error) {
			callback(null, mediaFileUser);	
		}
		else {
			callback(error, null);
		}
		
	})	
}