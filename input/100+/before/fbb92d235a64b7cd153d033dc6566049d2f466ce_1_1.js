function( args, callback ){
	CourseSection.create( { course : args.course, section : args.section, app : args.app })
	.success(function(newCourseSection){
		callback( null, newCourseSection );
	}).error(function(error){
		callback( error, null);
	});
}