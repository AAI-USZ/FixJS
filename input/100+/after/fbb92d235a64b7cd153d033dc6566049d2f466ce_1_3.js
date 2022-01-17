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

	CourseSection.find({ where : { section : args.section }}).success( function( courseSection ){
		if ( null === courseSection ){
			callback("The section doesn't exist", null );
		}
		else {
			courseSection.destroy().error(function ( error ){
				callback( error, null );
			}).success( function ( removedCourseSection ){
				callback( null, removedCourseSection );
			});
		}
	}).error( function ( error ){
		callback( error, null );
	});	
}