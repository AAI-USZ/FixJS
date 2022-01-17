function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = args.hasOwnProperty('section');
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	Section.find({ where : { uuid : args.section }}).success(function(sectionToBeRemoved){
		if ( null === sectionToBeRemoved ){
			callback("This section does not exist " + args.section , null );
		}
		else {
			sectionToBeRemoved.destroy().error(function(error){
				callback(error, null);
			}).success( function ( removedSection ){
				
			callback( null,sectionToBeRemoved);
			});
		}
	});
}