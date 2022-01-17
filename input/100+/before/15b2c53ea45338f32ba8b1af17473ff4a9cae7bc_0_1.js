function( args, callback ){

	Tag.createTag(args, function(error, newTag){		
		if (!error) {
			callback(null, newTag);	
		}
		else {
			callback(error, null);
		}
		
	})	
}