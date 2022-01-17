function( listener, callback ) {
			UserNotificationSettings.findNotificationSettings( listener, function( error, settings ){

				if ( settings == undefined || settings === null){
					callback("error occurred "+error, null);
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
							callback( error, null);
							
							
						}else {
							addedUserNotifications.push( newNotification );
							callback( null, newNotification);
						}
				});
				
				compileEmail( arg, function( error, newNotification ){
						if ( error ){
							callback( error, null);
							return;
						}
				});
			});
		}