function( error, sectionMaterial ){
		args.sectionmaterial = sectionMaterial;
		SectionMaterial.updateSectionMaterial( args, function( error, updatedMaterial ){
			callback( null, updatedMaterial );
		});
	}