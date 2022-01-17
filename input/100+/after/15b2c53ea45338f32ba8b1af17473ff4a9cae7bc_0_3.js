function( uuid , args, callback ){	
	if ( uuid === null || uuid === undefined ){
		console.log('not here uuid')
		callback("UUID is not existent", null);
		return;
	}	
	if ( args === null || args === undefined ){
		console.log('not here args')
		callback("Args is not existent", null);
		return;
	}

	var containsAllProperties = (args.hasOwnProperty('start') || 
		args.hasOwnProperty('end') || args.hasOwnProperty('type') || args.hasOwnProperty('target') ||
		args.hasOwnProperty('title') || args.hasOwnProperty('description') || args.hasOwnProperty('question') ||
		args.hasOwnProperty('important') || args.hasOwnProperty('interest') || args.hasOwnProperty('examable') ||
		args.hasOwnProperty('reviewlater') || args.hasOwnProperty('shared'));

	if (  !containsAllProperties ){
		callback("Need to contain at least one valid args ", null );
		return;		
	}
	
	Tag.updateTag(uuid, args, function(error, updatedTag){		
		if (!error) {
			callback(null, updatedTag);	
		}
		else {
			callback(error, null);
		}
		
	})	
}