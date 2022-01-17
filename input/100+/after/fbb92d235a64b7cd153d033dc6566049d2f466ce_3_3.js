function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('section') &&
		args.hasOwnProperty('resource') );
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	SectionMaterial.create({ section : args.section, material : args.resource}).success( function ( savedMaterial ){
		callback( null, savedMaterial );
	}).error( function ( error ){
		callback( error, null );
	});
}