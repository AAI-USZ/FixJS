function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('sections') &&
		args.hasOwnProperty('title') );
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	Section.find({ where : { uuid : args.sections, title : args.title }}).success(function( section ){
		callback( null, section );
	}).error( function ( error ){
		callback( error, null );
	});
}