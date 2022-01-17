function( args, callback){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('title') && args.hasOwnProperty('course') &&
		args.hasOwnProperty('app') );
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	CourseSection.sectionsInCourse( args, function( error, courseSectionUUIDs){
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
	});
}