function(err, message){
		 		if ( err ){
					 console.log("Can't send email: " + JSON.stringify(err));
		 			callback( err, null );
		 		} else {
		 			callback( null, message );
		 		}
		 		
		  	}