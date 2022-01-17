function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('section') &&
		args.hasOwnProperty('resource'));
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

    SectionMaterial.findAMaterialInSection( args, function( error, sectionMaterial ){
    	var argsToRemove = {
    		sectionmaterial : sectionMaterial
    	}
    	SectionMaterial.removeMaterialFromSection( argsToRemove, function( error, removedMaterial ){
    		callback( null, removedMaterial );
    	});
    }); 
}