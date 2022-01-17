function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('course') && args.hasOwnProperty('section') &&
		args.hasOwnProperty('app') );
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	CourseSection.create( { course : args.course, section : args.section, app : args.app })
	.success(function(newCourseSection){
		callback( null, newCourseSection );
	}).error(function(error){
		callback( error, null);
	});
}