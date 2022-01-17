function( error, settings ){

				if ( settings == undefined || settings === null){
					console.log("[UserNotificationSettings.findNotificationSettings] error - "+error);
					callback(null, new Array());
					return;
				}
				if(settings){
					switch(arg.event){
						case 0: arg.wait = settings.notificationOnLike       ; break;
						case 1: arg.wait = settings.notificationOnComment    ; break;
						case 2: arg.wait = settings.notificationOnStar       ; break;
						case 3: arg.wait = settings.notificationOnNewResource; break;
					}
					//by default email notification has not been sent yet
					if ( 0 == arg.wait ) {
						arg.emailSent = true;
					} else {
						arg.emailSent = false;
					}
				}
				arg.user     = listener.user;
				arg.listener = listener.uuid;

				UserNotification.createUserNotification( arg, function( error, newNotification ){
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
				});
			}