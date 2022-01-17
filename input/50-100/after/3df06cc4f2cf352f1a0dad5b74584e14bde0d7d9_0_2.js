function(error, newListener){
				if ( error ){
					console.log("[NotificationAction.createNotificationListener] error - "+error);
					callback( null , new Object() );
					return;
				}
				if ( null == newListener ){
					console.log("[NotificationAction.createNotificationListener] error - no listener created");
					callback( null, new Object());
					return;
				}
				// if we had o create a new listener
				callback( null, newListener );
			}