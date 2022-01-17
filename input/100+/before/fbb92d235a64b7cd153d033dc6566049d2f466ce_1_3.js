function( courseSection ){
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
	}