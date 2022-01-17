function(err, results){
			if ( err ) {
				callback( err, null );
			}else {
			    console.log("done!!");
				callback( null, addedStudents );
			}
	     }