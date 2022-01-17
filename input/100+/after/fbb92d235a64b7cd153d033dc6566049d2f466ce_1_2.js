function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = args.hasOwnProperty('course');
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	CourseSection.findAll({ where : { course : args.course }}).success( function( courseSections ){
		var sectionID = new Array();
		var i = courseSections.length - 1;
		for (; i >= 0; i--){
			sectionID.push( courseSections[i].section );
		}
		callback( null, sectionID );
		return;
	}).error( function( error ){  // error block - CourseSection.findAll
		callback( error, null );  
	});
}