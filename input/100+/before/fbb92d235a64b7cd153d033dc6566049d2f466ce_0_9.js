function( error, courseSections ){
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
	}