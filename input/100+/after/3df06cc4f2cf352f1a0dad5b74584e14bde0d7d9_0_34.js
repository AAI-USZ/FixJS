function( error , setting ){
		if ( error ){
			console.log("[NotificationAction.updateUserNotificationSettings] error - "+error);
			callback( null, new Object());
			return;
		}
		if ( null === setting ){
			console.log("[NotificationAction.updateUserNotificationSettings] error - No settings found");
			callback( null, new Object());
			return;
		}
		arg.usernotificationsettings = setting;
		UserNotificationSettings.updateUserNotificationSettings(arg, function( error, updatedSettings ){
			if ( error ){
				console.log("[UserNotificationSettings.updateUserNotificationSettings] error - "+error);
				callback( null, new Object());
			} else {
				callback( null, updatedSettings );
			}
		});
	}