function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('sectionObject') && args.hasOwnProperty('title'));
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	args.sectionObject.updateAttributes({ title : args.title }).error(function(error ){
		callback( error, null );
	}).success( function ( section ){
		callback( null, section );
	});
}