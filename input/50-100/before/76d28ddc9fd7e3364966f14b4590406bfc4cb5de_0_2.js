function( args, callback ){ 	
	MediaFile.getMediaFileUser(args, function(error, mediaFileUser){		
		if (!error) {
			callback(null, mediaFileUser);	
		}
		else {
			callback(error, null);
		}
		
	})	
}