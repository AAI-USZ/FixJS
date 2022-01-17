function( error, userNotifications ){
				if ( error ){
					callback( error, null );
					return;
				}
				if ( 0 === userNotifications.length ){
					callback( "No user notifications were found matching your parameters", null );
					return;
				}
				arg.usernotifications = userNotifications;
				UserNotification.removeUserNotifications( arg, function( error, removedUserNotifications){
					if ( error ){
						callback( error, null );
						return;
					}else {
						callback( null, removedUserNotifications);
					}
				});
			}