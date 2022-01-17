function( uuid, args, callback ){
	MediaFile.updateMediaFile(uuid, args, function(error, updatedMediaFile){
		if (!error) {
			callback(null, updatedMediaFile);	
		}
		else {
			callback(error, null);
		}
		
	})	
}