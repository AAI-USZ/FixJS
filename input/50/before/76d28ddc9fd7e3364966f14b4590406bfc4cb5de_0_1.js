function( args, callback ){ 	
	MediaFile.deleteMediaFile( args, function(error, deletedMediaFile){		
		if (!error) {
			callback(null, deletedMediaFile);	
		}
		else {
			callback(error, null);
		}		
	})	
}