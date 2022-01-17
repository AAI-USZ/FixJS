function( uuid, args, callback ){	
	if ( uuid === null || uuid === undefined ){		
		callback("UUID is not existent", null);
		return;
	}

	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('user') || args.hasOwnProperty('title') || 
	args.hasOwnProperty('path') || args.hasOwnProperty('type'));
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}	

	MediaFile.updateMediaFile(uuid, args, function(error, updatedMediaFile){
		if (!error) {
			callback(null, updatedMediaFile);	
		}
		else {
			callback(error, null);
		}
		
	})	
}