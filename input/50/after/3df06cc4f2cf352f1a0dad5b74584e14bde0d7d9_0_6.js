function(err, results){
			if ( err ) {
				console.log("[NotificationAction.setupCourseMaterialNotifiers] error - "+error);
				callback( null, new Array() );
			}else {
				callback( null, addedStudents );
			}
	     }