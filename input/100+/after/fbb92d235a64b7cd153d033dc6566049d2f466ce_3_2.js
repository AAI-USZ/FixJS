function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = args.hasOwnProperty('section');
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	SectionMaterial.findAll({ where: { section : args.section }}).success(function(sectionmaterials){
		callback( null, sectionmaterials );
	}).error(function(error){
		callback( error, null );
	});
}