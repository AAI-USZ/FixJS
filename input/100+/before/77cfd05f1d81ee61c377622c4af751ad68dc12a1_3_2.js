function( error, notificationSettings ){
		if ( null === notificationSettings ){
			var newSettings = UserNotificationSettings.build(args);
			newSettings.save().error(function(error){
				callback( error, null);
			}).success(function( setting ){
				callback(null, setting );
			});
		}
	}