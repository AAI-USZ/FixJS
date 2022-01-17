function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('resource') && args.hasOwnProperty('section'));
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	SectionMaterial.find({ where : { material : args.resource, section  : args.section }}).success( function ( sectionMaterial ){
		callback( null, sectionMaterial );
	}).error(function(error){
		callback( error, null );
	});
}