function( target, args, callback ){ 	
	MediaFile.updateMediaFile(target, args, function(error, updatedMediaFile){		
		if (!error) {
			callback(null, updatedMediaFile);	
		}
		else {
			callback(error, null);
		}
		
	})	
}