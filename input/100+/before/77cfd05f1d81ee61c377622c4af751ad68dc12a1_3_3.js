function(args, callback ) {

	UserNotificationSettings.find({where : { user : args.user,
                                                app : args.app }
    }).success(function(notificationSettings ){
    	callback( null, notificationSettings );
    }).error(function(error){
    	callback( error, null );
    });
}