function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('user') && args.hasOwnProperty('start') && 
		args.hasOwnProperty('end') && args.hasOwnProperty('type') && args.hasOwnProperty('target') &&
		args.hasOwnProperty('title') && args.hasOwnProperty('description') && args.hasOwnProperty('question') &&
		args.hasOwnProperty('important') && args.hasOwnProperty('interest') && args.hasOwnProperty('examable') &&
		args.hasOwnProperty('reviewlater') && args.hasOwnProperty('shared'));
	
	console.log("not yet passed the argument test");

	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	console.log("passed the argument test");

	Tag.createTag(args, function(error, newTag){		
		if (!error) {
			callback(null, newTag);	
		}
		else {
			callback(error, null);
		}
		
	})	
}