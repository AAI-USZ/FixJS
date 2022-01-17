function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('title') && args.hasOwnProperty('sections') &&
		args.hasOwnProperty('app') );
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	Section.find({ where : { uuid : args.sections, title : args.title }}).success(function( section ){
		if ( null === section ){
			var newUUID = UUID.generate();
			
			Section.create({ uuid : newUUID, title : args.title, app : args.app }).error(function(error){
				callback(error, null );
			}).success(function( newSection){
				callback( null, newSection );
			});
		}
		else {
			callback(" The section already exists with this course", null );
		}
	}).error( function( error ){ // error block -  Section.findAll 
		callback( error, null );
	});
}