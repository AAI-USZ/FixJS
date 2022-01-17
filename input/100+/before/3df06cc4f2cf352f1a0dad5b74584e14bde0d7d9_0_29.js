function( args, callback ){
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = (args.hasOwnProperty('app') &&
	                              args.hasOwnProperty('target'));
		                            
	if (  !containsAllProperties ){
		callback("Invalid args ", null );
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
					console.log('### -> '+error);
					callback( error, null );
				} else {
					addedStudents.push( data );
					callback(null, data );
					console.log("## RA");
				}
			});
		
	    }, function(err, results){
			if ( err ) {
				callback( err, null );
			}else {
			    console.log("done!!");
				callback( null, addedStudents );
			}
	     } );
	});
}