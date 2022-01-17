function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = args.hasOwnProperty('course');
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	CourseSection.sectionsInCourse( args, function( error, courseSections ){
		if ( error ) {
			callback( error, null );
			return;
		}
		args.section = courseSections;
		SectionMaterial.findAllMaterialsInSection( args, function( error, sectionMaterials ){
			if ( error ) {
				callback( error, null );
			}
			else {
				callback( null, sectionMaterials.length );
			}
		});
	});
}