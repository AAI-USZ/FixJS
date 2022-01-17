function( args, callback ){ 
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = args.hasOwnProperty('uuid');
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	Tag.deleteTag( args, function(error, deletedTag){		
		if (!error) {
			callback(null, deletedTag);	
		}
		else {
			callback(error, null);
		}		
	})	
}