function( error, updatedSettings ){
			if ( error ){
				console.log("[UserNotificationSettings.updateUserNotificationSettings] error - "+error);
				callback( null, new Object());
			} else {
				callback( null, updatedSettings );
			}
		}