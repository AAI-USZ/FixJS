function( error, courseSectionUUIDs){
		if ( error ){
			callback( error, null );
			return;
		}
		args.sections = courseSectionUUIDs;
		Section.findSection( args, function ( error, section ){
			if ( error ){
				callback( error, null );
				return;
			}
			Section.createSection( args, function ( error, newSection ){
				if ( error ){
					callback( error , null );
					return;
				}
				args.section = newSection.uuid;
				CourseSection.createCourseSection( args, function ( error, newCourseSection ){
					if ( error ){
						callback( error, null );
						return;
					}
					else {
						callback( null, newSection);
					}	
				});
			});
		});
	}