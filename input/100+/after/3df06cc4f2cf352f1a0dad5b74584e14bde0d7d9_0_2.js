function( args, callback ){

	if ( args === null || args === undefined ){
		console.log("[NotificationAction.addUserNotification] error - Args is not existent");
		callback(null, new Array());
		return;
	}
	
	var containsAllProperties =  (
	                                   args.hasOwnProperty('target') &&
		                               args.hasOwnProperty('event') &&
		                               args.hasOwnProperty('app') &&
		                               args.hasOwnProperty('description')
		                        );
		                            
	if (!containsAllProperties ){
		console.log("[NotificationAction.addUserNotification] error - Invalid args");
		callback(null, new Array());
		return;
	}
	
	var arg = new Object();
	arg.target = args.target;
	arg.app = args.app;
	arg.event = args.event;
	arg.description = args.description;
	
	var self = this;
	var addedUserNotifications = new Array();
	var argsWithListeners = new Array();
	NotificationListener.findAllNotificationListeners( arg, function( error, listeners ){
		async.forEachSeries( listeners, function( listener, callback ) {
			UserNotificationSettings.findNotificationSettings( listener, function( error, settings ){

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
			});
		} , function( err, results ){
			if ( err ){
				console.log("[NotificationAction.addUserNotification] error - "+err);
				callback( null, new Array());
			}
			else {
				callback( null, addedUserNotifications );
			}
		});
	});
}