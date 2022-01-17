function( args, callback ){ 
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = args.hasOwnProperty('uuid');
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	MediaFile.getMediaFileTags(args, function(error, mediaFileTags){		
		if (!error) {
			callback(null, mediaFileTags);	
		}
		else {
			callback(error, null);
		}
		
	})	
}