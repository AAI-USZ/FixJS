function( userNotification, callback ){
		  				console.log("attempting to update");
		  				userNotification.updateAttributes({
		  					emailSent : true
		  				}).success(function(updateSettings){
		  					console.log("[SUCCESS]");
		  					callback( null, updateSettings );
		  				}).error(function(error){
		  					console.log("[ERROR] "+error);
		  					callback( error, null );
		  				});
		  			
		  				}