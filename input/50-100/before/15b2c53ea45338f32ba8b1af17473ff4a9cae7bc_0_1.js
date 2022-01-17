function( args, callback ){ 	
	Tag.deleteTag( args, function(error, deletedTag){		
		if (!error) {
			callback(null, deletedTag);	
		}
		else {
			callback(error, null);
		}		
	})	
}