function( error, newNotification ){
								if ( error ){
									console.log("Error compiling email");
									callback( error, null);
								} else{
									callback( null, newNotification);
								}
							}