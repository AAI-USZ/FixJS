function( error, newNotification ){
						if ( error ){
							callback( error, null);
						}else {
							addedUserNotifications.push( newNotification );

							//The root of the problem lies here.
							console.log("Computing email")
							compileEmail( arg, function( error, newNotification ){
								if ( error ){
									console.log("Error compiling email");
									callback( error, null);
								} else{
									callback( null, newNotification);
								}
							});
						}
				}