function( args, callback ){	 
	MediaFile.createMediaFile(args, function(error, newMediaFile){		
		if (!error) {
			callback(null, newMediaFile);	
		}
		else {
			callback(error, null);
		}
		
	})	
}