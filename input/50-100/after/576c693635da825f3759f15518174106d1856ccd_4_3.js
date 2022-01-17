function( uuid , args, callback ){ 	
	Tag.updateTag(uuid, args, function(error, updatedTag){		
		if (!error) {
			callback(null, updatedTag);	
		}
		else {
			callback(error, null);
		}
		
	})	
}