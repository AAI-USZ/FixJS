function( id, args, callback ){
	MediaFile.updateMediaFile(id, args, function(error, updatedMediaFile){
		if (!error) {
			callback(null, updatedMediaFile);	
		}
		else {
			callback(error, null);
		}
		
	})	
}