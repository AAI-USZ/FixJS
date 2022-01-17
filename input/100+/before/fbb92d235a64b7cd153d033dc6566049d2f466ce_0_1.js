function( args, callback ){
	
	SectionMaterial.findAMaterialInSection( args, function( error, sectionMaterial){
		if ( null === sectionMaterial ) {
			SectionMaterial.createSectionMaterial( args, function( error, newSectionMaterial){
				callback( null, newSectionMaterial);
			});
		}else {
			callback ("The section material already exists", null );
		}
	});
}