function( user_uid, args, callback ){ 	
	Tag.updateTag(user_uid, args, function(error, updatedTag){		
		if (!error) {
			callback(null, updatedTag);	
		}
		else {
			callback(error, null);
		}
		
	})	
}