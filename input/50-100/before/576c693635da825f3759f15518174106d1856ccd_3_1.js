function( target_uuid, args, callback ){ 	
	MediaFile.updateMediaFile(target_uuid, args, function(error, updatedMediaFile){		
		if (!error) {
			callback(null, updatedMediaFile);	
		}
		else {
			callback(error, null);
		}
		
	})	
}