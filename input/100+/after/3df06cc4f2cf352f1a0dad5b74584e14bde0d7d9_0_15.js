function(err, message){
		 		if ( err ){
		 			console.log("[NotificationAction.compileEmail] error - "+err);
		 			callback( null, new Object());
		 		} else {
		 			callback( null, message );
		 		}
		  	}