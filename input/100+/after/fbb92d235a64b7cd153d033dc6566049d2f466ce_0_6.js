function( args, callback){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('newtitle') && args.hasOwnProperty('course') &&
		args.hasOwnProperty('title') );
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

    CourseSection.sectionsInCourse( args, function( error, courseSections ){
    	if ( error ){
    			callback( error, null );
    			return;
    	}
    	args.sections = courseSections;
    	Section.findSection( args, function( error, section ){
    		if ( error ){
    			callback( error, null );
    			return;
    		}
    		args.sectionObject = section;
    		args.title = args.newtitle;
    		Section.updateSection( args, function( error, updatedSection ){
    			callback( null, updatedSection );
    		});
    	});
    });
}