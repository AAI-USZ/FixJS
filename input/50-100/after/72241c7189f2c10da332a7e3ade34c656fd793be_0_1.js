function(err, message){
		 		if ( err ){
					 console.log("Can't send email: " + JSON.stringify(err));
		 			callback( err, null );
		 		} else {
					console.log("Email sent, no errors")
		 			callback( null, message );
		 		}
		 		
		  	}