function( error, newNotification ){
						if ( error ){
							console.log("[UserNotification.createUserNotification] error - "+ error );
							callback( null, new Object());
						}else {
							addedUserNotifications.push( newNotification );

							//The root of the problem lies here.
							compileEmail( arg, function( error, newNotification ){
								if ( error ){
									console.log("[NotificationAction.compileEmail] error - "+error);
									callback( null, new Object());
								} else{
									callback( null, newNotification);
								}
							});
						}
				}