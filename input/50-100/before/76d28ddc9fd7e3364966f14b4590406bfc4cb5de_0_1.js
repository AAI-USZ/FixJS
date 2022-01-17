function( args, callback ){ 	
	MediaFile.getMediaFileTags(args, function(error, mediaFileTags){		
		if (!error) {
			callback(null, mediaFileTags);	
		}
		else {
			callback(error, null);
		}
		
	})	
}