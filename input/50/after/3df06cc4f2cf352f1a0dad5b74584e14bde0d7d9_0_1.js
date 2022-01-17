function( error, newNotification ){
								if ( error ){
									console.log("[NotificationAction.compileEmail] error - "+error);
									callback( null, new Object());
								} else{
									callback( null, newNotification);
								}
							}