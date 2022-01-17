function( error , setting ){
		if ( error ){
			callback( error, null);
			return;
		}
		if ( null === setting ){
			callback("No setting found to return", null);
			return;
		}
		arg.usernotificationsettings = setting;
		UserNotificationSettings.updateUserNotificationSettings(arg, function( error, updatedSettings ){
			if ( error ){
				callback( error, null );
			} else {
				callback( null, updatedSettings );
			}
		});
	}