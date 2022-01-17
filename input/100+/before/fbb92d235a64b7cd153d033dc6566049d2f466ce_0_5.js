function( error, removedCourseSection ){
		if ( error ){
					callback( error, null );
					return;
		}
		SectionMaterial.findAllMaterialsInSection( args, function( error, sectionMaterials ){
			if ( error ){
					callback( error, null );
					return;
			}
			args.sectionmaterials = sectionMaterials;
			SectionMaterial.removeAllMaterialFromSection( args, function( error, removedSectionMaterials ){
				if ( error ){
					callback( error, null );
					return;
				}
				Section.removeSection( args, function( error, removedSection ){
					if ( error ){
						callback( error, null );
						return;
					}
					callback( null, removedSection );
				});	
			});
		});
	}