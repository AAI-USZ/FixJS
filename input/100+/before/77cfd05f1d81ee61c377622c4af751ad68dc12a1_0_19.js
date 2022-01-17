function( args, callback ){
	var self = this;
	Course.getCourseMembers( { course : args.target }, function( err, students ){
		var i = students.length - 1;
		var students = new Array();
		var addedStudents = new Array();
		for(; i >= 0; i-- ){
			var arg = args;
			arg.user = students[i].uuid;
			students.push( arg );
		}
		async.forEachSeries( students, function( student, callback){
			self.addNewResourceNotifier( student, function( error, data ){
				if ( error ){
					callback( error );
				} else {
					addedStudents.push( data );
				}
			})
		, function(err){
			if ( err ) {
				callback( err, null );
			}else {
				callback( null, addedStudents );
			}
	     }
	    });
	});
}