function( args, callback ) {
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('newsection') &&
		args.hasOwnProperty('sectionmaterial') );
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

    args.sectionmaterial.updateAttributes({ section : args.newsection }).error(function(error ){
		callback( error, null );
	}).success(function(updatedSectionMaterial){
		callback( null, updatedSectionMaterial );
	});
    
}