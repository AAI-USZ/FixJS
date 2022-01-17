f	/*
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = args.hasOwnProperty('uuid');
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	*/

	MediaFile.deleteMediaFile( args, function(error, deletedMediaFile){		
		if (!error) {
			callback(null, deletedMediaFile);	
		}
		else {
			callback(error, null);
		}		
	})	
}
