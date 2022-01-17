function( args, callback ){
	if ( args === null || args === undefined ){
		console.log("[NotificationAction.setupCourseMaterialNotifiers] error - Args is not existent");
		callback( null, new Array());
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('app') &&
	                              args.hasOwnProperty('target'));
		                            
	if (  !containsAllProperties ){
		console.log("[NotificationAction.setupCourseMaterialNotifiers] error - Invalid args");
		callback( null, new Array());
		return;
	}
	var self = this;
	Course.getCourseMembers( args.target , function( err, studentsInCourse ){
		var i = studentsInCourse.length - 1;
		var students = new Array();
		var addedStudents = new Array();
		for(; i >= 0; i-- ){
			var arg = new Object();
			arg.target = args.target;
			arg.user = studentsInCourse[i].userID;
			arg.app  = args.app;
			students.push( arg );
		}
		async.forEachSeries( students, function( student, callback){
			self.addNewResourceNotifier( student, function( error, data ){
				if ( error ){
					console.log("[NotificationAction.setupCourseMaterialNotifiers] error - "+error);
					callback( null, new Array());
					return;
				} else {
					addedStudents.push( data );
					callback(null, data );
				}
			});
		
	    }, function(err, results){
			if ( err ) {
				console.log("[NotificationAction.setupCourseMaterialNotifiers] error - "+error);
				callback( null, new Array() );
			}else {
				callback( null, addedStudents );
			}
	     } );
	});
}