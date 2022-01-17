function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('section') && args.hasOwnProperty('newsection') &&
		args.hasOwnProperty('resource') );
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	SectionMaterial.findAMaterialInSection( args, function( error, sectionMaterial ){
		args.sectionmaterial = sectionMaterial;
		SectionMaterial.updateSectionMaterial( args, function( error, updatedMaterial ){
			callback( null, updatedMaterial );
		});
	});
}