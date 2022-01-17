function( args, callback ){
	
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