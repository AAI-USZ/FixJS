function( error, sectionMaterial ){
    	var argsToRemove = {
    		sectionmaterial : sectionMaterial
    	}
    	SectionMaterial.removeMaterialFromSection( argsToRemove, function( error, removedMaterial ){
    		callback( null, removedMaterial );
    	});
    }