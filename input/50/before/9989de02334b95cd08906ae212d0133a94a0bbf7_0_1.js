function(err, message){
		 		if ( err ){
					 console.log("Can't send email");
		 			callback( err, null );
		 		} else {
		 			callback( null, message );
		 		}
		 		
		  	}