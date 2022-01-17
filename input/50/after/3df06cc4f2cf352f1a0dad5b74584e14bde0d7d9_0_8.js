function( error, newSettings ){
		if( error){
			console.log("[UserNotificationSettings.addNotificationSetting] error - "+error);
			callback( null, new Object());
		}
		else {
			callback(null, newSettings);
		}
	}